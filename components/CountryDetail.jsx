import React, { useEffect, useState } from "react";
import "./CountryDetail.css";
import { Link, useLocation, useParams } from "react-router";
import { useTheme } from "../hooks/useTheme";
import CountryDetailShimmer from "./CountryDetailShimmer";

function CountryDetail() {
  const params = useParams();
  const countryName = params.country;

  const [isDark] = useTheme();

  const { state } = useLocation();

  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  function updateCountryData(data) {
    setCountryData({
      flag: data.flags.svg,
      name: data.name.common || data.name,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population.toLocaleString("en-IN"),
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      topLevelDomain: data.tld,
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(", "),
      languages: Object.values(data.languages || {}).join(", "),
      borders: [],
    });

    if (!data.borders) {
      data.borders = [];
    }
    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common);
      })
    ).then((borders) => {
      setTimeout(() =>
        setCountryData((prevState) => ({ ...prevState, borders }))
      );
    });
  }

  useEffect(() => {
    if (state) {
      updateCountryData(state);
      return;
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data);
      })
      .catch((err) => setNotFound(true));
  }, [countryName]);

  if (notFound) {
    return <div>Country not found</div>;
  }
  return countryData === null ? (
    <CountryDetailShimmer />
  ) : (
    <>
      <main className={`${isDark ? "dark" : ""}`}>
        <div className="country-details-container">
          <span className="back-button" onClick={() => history.back()}>
            <i className="fa-solid fa-arrow-left" />
            &nbsp;&nbsp;&nbsp;Back
          </span>
          <div className="country-details">
            <div className="country-img">
              <img src={countryData.flag} alt={`${countryData.name} flag`} />
            </div>
            <div className="details-text-container">
              <h1>{countryData.name}</h1>
              <div className="details-text">
                <p>
                  <b>Native Name: </b>
                  <span className="native-name">
                    {countryData.nativeName || countryData.name}
                  </span>
                </p>
                <p>
                  <b>Population: </b>
                  <span className="population">{countryData.population}</span>
                </p>
                <p>
                  <b>Region: </b>
                  <span className="region">{countryData.region}</span>
                </p>
                <p>
                  <b>Sub Region: </b>
                  <span className="sub-region">{countryData.subregion}</span>
                </p>
                <p>
                  <b>Capital: </b>
                  <span className="capital">
                    {countryData.capital?.join(", ")}
                  </span>
                </p>
                <p>
                  <b>Top Level Domain: </b>
                  <span className="top-level-domain">
                    {countryData.topLevelDomain.join(", ")}
                  </span>
                </p>
                <p>
                  <b>Currencies: </b>
                  <span className="currency">{countryData.currencies}</span>
                </p>
                <p>
                  <b>Language(s): </b>
                  <span className="languages">{countryData.languages}</span>
                </p>
              </div>
              {countryData.borders.length !== 0 && (
                <div className="border-countries">
                  <b>Border Countries:&nbsp;&nbsp;</b>
                  {countryData.borders.map((border) => (
                    <Link key={border} to={`/${border}`}>
                      {border}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CountryDetail;
