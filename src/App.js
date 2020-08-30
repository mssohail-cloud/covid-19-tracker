import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import InfoBox from './Components/InfoBox';
import image from './assets/image.png';

import './App.css';
import CountriesTable from './Components/CountriesTable';
import { SortData, PrintStat } from './SortFunc';
import LineChart from './Components/LineChart';

function App() {


  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('global');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
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
          <img src={image} alt="COVID-19" />
        </div>
        <div>

          <FormControl className="app_dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="global">Global</MenuItem>

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}



            </Select>
          </FormControl>

        </div>

        <div className="app_states">
          <InfoBox isRed active={casesType === "cases"}
            onClick={(e) => setCasesType('cases')}
            title="Coronavirus Cases" cases={PrintStat(countryInfo.todayCases)} total={PrintStat(countryInfo.cases)} />

          <InfoBox active={casesType === "recovered"}
            onClick={(e) => setCasesType('recovered')}
            title="Recovered" cases={PrintStat(countryInfo.todayRecovered)} total={PrintStat(countryInfo.recovered)} />

          <InfoBox isRed active={casesType === "deaths"}
            onClick={(e) => setCasesType('deaths')}
            title="Deaths" cases={PrintStat(countryInfo.todayDeaths)} total={PrintStat(countryInfo.deaths)} />
        </div>


        <div>
          <h2>Wordwide new {casesType}</h2>

          <LineChart casesType={casesType} />
        </div>


      </div>

      <Card className="right_section">
        <CardContent>
          <div className="app_information">
            <h2>Live cases from countries</h2>
            <CountriesTable countries={tableData} />
          </div>
        </CardContent>

      </Card>



    </div>
  );
}

export default App;
