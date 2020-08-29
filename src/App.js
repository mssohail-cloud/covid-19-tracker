import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import InfoBox from './Components/InfoBox';

import './App.css';
import Map from './Components/Map';
import CountriesTable from './Components/CountriesTable';
import { SortData } from './SortFunc';

function App() {


  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('global');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data)
    })
  }, [])

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

          const sortedData = SortData(data);
          setTableData(sortedData);
          setCountries(countries);

      })
    }

    getCountriesData();
  }, []);


  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    //console.log(".......>>>>> ", countryCode);

    setCountry(countryCode);

    const url = countryCode === 'global' ? 'https://disease.sh/v3/covid-19/all' :
     `https://disease.sh/v3/covid-19/countries/${countryCode}`;

     await fetch(url)
     .then(response => response.json())
     .then(data => {

      setCountryInfo(data);

     })
  };

  console.log(countryInfo);

  return (
    <div className="app">

      <div className="left_section">
      <div className="app_header">
        <h1>Covid-19 Tracker</h1>

        <FormControl className="app_dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="global">Global</MenuItem>

            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}


            {/* <MenuItem value="Worldwide">WorldWide</MenuItem>
            <MenuItem value="Option 2">Option 2</MenuItem>
            <MenuItem value="Option 3">Option 3</MenuItem>  */}
          </Select>
        </FormControl>

      </div>

      <div className="app_states">
        <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
        <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
        <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
      </div>

      <Map />


      </div>

      <Card className="right_section">
        <CardContent>
          <h2>Live cases from countries</h2>
          <CountriesTable countries={tableData}/>
          <h2>Wordwide new cases</h2>
        </CardContent>

      </Card>

      

    </div>
  );
}

export default App;
