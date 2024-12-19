import React from "react";
import { Link } from "react-router";

export default function CountryCard({name, flags, population, region, capital, data}) {
  
    // console.log(name);
  return (
    <div>
      <Link className="country-card" to={`/${name}`} state={data}>
        <div className="flag-container">
        <img src={flags} alt={name + 'flag'} />
        </div>
        <div className="card-text">
          <h3 className="card-title">{name}</h3>
          <p>
            <b>Population: </b>{population}
          </p>
          <p>
            <b>Region: </b>{region}
          </p>
          <p>
            <b>Capital: </b>{capital}
          </p>
        </div>
      </Link>
    </div>
  );
}
