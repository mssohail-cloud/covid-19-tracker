import React from 'react';
import '../../src/CountriesTable.css';
import numeral from 'numeral';

function CountriesTable({ countries }) {
    return (
        <div className="countriesTable">
            {countries.map(({country, cases}) => (
                <tr>
                    <td>{country}</td>
            <td><strong>{numeral(cases).format("0,0")}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default CountriesTable
