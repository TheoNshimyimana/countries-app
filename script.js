const getCountryData = async function () {
  try {
    const countryList = document.getElementById('countries--list');
    const continentForm = document.getElementById('continents--form');

    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();

    data.sort((a, b) => {
      const nameA = a.name.common.toUpperCase();
      const nameB = b.name.common.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    const searchInput = document.getElementById('search--input');
    const searchButton = document.getElementById('search--button');

    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const searchedCountry = data.find((country) =>
        country.name.common.toLowerCase().includes(searchTerm)
      );

      if (searchedCountry) {
        
        displayCountries([searchedCountry], countryList);
      } else {

        countryList.innerHTML = '<p>No matching country found. Please try again</p>';
      }
    });

    continentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const selectedContinent = document.getElementById(
        'selected--continent'
      ).value;

      const filteredData = data.filter(
        (country) =>
          selectedContinent === '' || country.region === selectedContinent
      );

      displayCountries(filteredData, countryList);
    });

    displayCountries(data, countryList);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const displayCountries = function (countries, container) {
  container.innerHTML = '';

  countries.forEach((country) => {
    const name = country.name.common;
    const flag = country.flags.png;
    const capital = country.capital;
    const location = country.region;
    const population = country.population;
    const area = country.area;

    const countryDetails = `
      <div>
        <h2>${name}</h2>
        <img src="${flag}" alt="${name} Flag" width="100">
        <p>Capital: ${capital}</p>
        <p>Location: ${location}</p>
        <p>Population: ${population}</p>
        <p>Area: ${area} km²</p>
      </div>
      <hr>
    `;

    container.innerHTML += countryDetails;
  });
};

getCountryData();
