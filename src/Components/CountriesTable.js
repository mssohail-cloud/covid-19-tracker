import React from 'react';
import '../../src/CountriesTable.css';

function CountriesTable({ countries }) {
    return (
        <div className="countriesTable">
            {countries.map(({country, cases}) => (
                <tr>
                    <td>{country}</td>
            <td><strong>{cases}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default CountriesTable
