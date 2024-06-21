import React, {useCallback, useEffect, useState} from 'react';
import {ApiCountry} from '../../types';
import axios from 'axios';
import {BASE_URL, COUNTRY_URL} from '../../constants';

interface Props {
  code: string | null;
}

const CountryInfo: React.FC<Props>= ({code}) => {
  const [country, setCountry] = useState<null | ApiCountry>(null);
  const [countryBorder, setCountryBorder] = useState<null | ApiCountry[]>(null);

  const fetchCountry = useCallback(async () => {
    if(code !== null) {
      const {data: countryInfo} = await axios.get<ApiCountry>(BASE_URL + COUNTRY_URL + code);

      if (countryInfo.borders) {
        const border = countryInfo.borders.map(async country => {
          const countryBorder = BASE_URL + COUNTRY_URL + country;
          const {data: borderName} = await axios.get<ApiCountry>(countryBorder);

          return borderName;
        });

        const countryBorderName = await Promise.all(border);
        setCountryBorder(countryBorderName);
      }

      setCountry(countryInfo);
    }
  }, [code]);

  useEffect(() => {
    void fetchCountry();
  }, [fetchCountry]);


  return country ? (
    <div className='country-info'>
      <div className='country-title'>
        <h1>{country.name}</h1>
        <img src={country.flag} alt={country.name} className='country-flag'/>
      </div>
      <div>
        {country.capital ? <p>Столица: <span className='capital'>{country.capital}</span></p> : <p>У страны нет сталицы</p>}
        <p>Население: <strong>{country.population}</strong> человек</p>
        {country.borders && countryBorder ? (
          <>
            <p>Страна граничит c:</p>
            <ul>
              {countryBorder.map((country) => (
                <li key={country.name}>{country.name}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>Страна не имеет границ с другими странами</p>
        )}
      </div>
    </div>
  ): (<p>Выберите страну</p>);
};

export default CountryInfo;