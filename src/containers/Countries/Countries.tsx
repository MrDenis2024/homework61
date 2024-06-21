import {useCallback, useEffect, useState} from 'react';
import {ICountry} from '../../types';
import axios from 'axios';
import {BASE_URL, COUNTRIES_URL} from '../../constants';
import Country from '../../components/Country/Country';
import CountryInfo from '../../components/ContryInfo/CountryInfo';

const Countries = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const {data: countries} = await axios.get<ICountry[]>(BASE_URL + COUNTRIES_URL);

    setCountries(countries);
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);


  return (
    <div className='countries'>
      <div className='countries-list'>
        {countries.map((country => (
          <Country key={country.alpha3Code} name={country.name} onClick={() => setSelectedCountryCode(country.alpha3Code)}/>
        )))}
      </div>
      <CountryInfo code={selectedCountryCode}/>
    </div>
  );
};

export default Countries;