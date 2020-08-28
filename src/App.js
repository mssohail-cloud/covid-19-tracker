import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';

function App() {


  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async() =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country, 
            value: country.countryInfo.iso2,
          }));

          setCountries(countries);

      })
    }

    getCountriesData();
  }, []);

  return (
    <div className="app">

      <div className="app_header">
        <h1>Covid-19 Tracker</h1>

        <FormControl className="app_dropdown">
          <Select variant="outlined" value="Global">

            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}


            {/* <MenuItem value="Worldwide">WorldWide</MenuItem>
            <MenuItem value="Option 2">Option 2</MenuItem>
            <MenuItem value="Option 3">Option 3</MenuItem>  */}
          </Select>
        </FormControl>

      </div>


    </div>
  );
}

export default App;
