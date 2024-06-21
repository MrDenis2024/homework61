import React, {useCallback, useEffect, useState} from 'react';
import {ApiCountry} from '../../types';
import axios from 'axios';
import {BASE_URL, COUNTRY_URL} from '../../constants';

interface Props {
  code: string | null;
}

const CountryInfo: React.FC<Props>= ({code}) => {
  const [country, setCountry] = useState<null | ApiCountry>(null);

  const fetchCountry = useCallback(async () => {
    if(code !== null) {
      const {data: countryInfo} = await axios.get<ApiCountry>(BASE_URL + COUNTRY_URL + code);

      setCountry(countryInfo);
    }
  }, [code]);

  useEffect(() => {
    void fetchCountry();
  }, [fetchCountry]);


  return country && (
    <div className='country-info'>
      <div className='country-title'>
        <h1>{country.name}</h1>
        <img src={country.flag} alt={country.name} className='country-flag'/>
      </div>
      <div>
        {country.capital ? <p>Столица: <span className='capital'>{country.capital}</span></p> : <p>У страны нет сталицы</p>}
        <p>Население: <strong>{country.population}</strong> человек</p>
      </div>
    </div>
  );
};

export default CountryInfo;