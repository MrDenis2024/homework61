import {useCallback, useEffect, useState} from 'react';
import {ApiCountries, ICountry} from '../../types';
import axios from 'axios';
import {BASE_URL, COUNTRIES_URL} from '../../constants';

const Countries = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);

  const fetchData = useCallback(async () => {
    const {data: countries} = await axios.get<ApiCountries[]>(BASE_URL + COUNTRIES_URL);

    setCountries(countries);
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return (
    <div>

    </div>
  );
};

export default Countries;