export interface ICountry {
  name: string;
  alpha3Code: string;
}

export interface ApiCountry {
  name: string;
  capital: string;
  population: number;
  borders: [string];
  flag: string;
}