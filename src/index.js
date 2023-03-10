import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'center-top',
});

import { fetchCountries } from './fetchCountries';
import { checkNativeName } from './utils/checkNativeName';
import { convertToInternationalCurrencySystem } from './utils/converterCurrency';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryList.style.listStyle = 'none';
countryList.style.fontSize = '30px';

const checkAmountOfCountries = countries => {
  if (countries.length == 1) {
    setOneCountry(countries);
  } else if (countries.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    setListOfCountries(countries);
  }
};

const checkCountries = _.debounce(async () => {
  let searchValue = searchInput.value;
  searchValue = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  const countries = await fetchCountries(searchValue);
  if (countries.status === 404) {
    return Notiflix.Notify.failure('Oops, there is no country with that name.');
  }
  checkAmountOfCountries(countries);
}, DEBOUNCE_DELAY);

searchInput.addEventListener('input', checkCountries);

const setListOfCountries = countries => {
  const markup = countries
    .map(country => {
      return `<li class="list__item" style="cursor: pointer; width: 400px;"><img src="${country.flag}" class="flag-svg"> ${country.name}</li>`;
    })
    .join('');
  countryInfo.innerHTML = '';
  countryList.innerHTML = markup;
  const flags = document.querySelectorAll('.flag-svg');
  flags.forEach(flag => {
    flag.style.width = '30px';
  });
  chooseByButton(countries);
};

const setOneCountry = countries => {
  const country = countries[0];
  const language = country.languages.map(item => {
    return ' ' + item.name + checkNativeName(item.nativeName);
  });
  countryInfo.innerHTML = `<h2><img src="${country.flag}" class="flag-svg"> ${
    country.name
  }</h2>
    <p><b>Capital: </b>${country.capital}</p>
    <p><b>Population: </b>${convertToInternationalCurrencySystem(
      country.population
    )} <i>(${country.population})</i></p>
    <p><b>Languages: </b>${language}</p>`;
  countryList.innerHTML = '';
  const flag = document.querySelector('.flag-svg');
  countryInfo.style.fontSize = '30px';
  flag.style.width = '80px';
};

const chooseByButton = countries => {
  const itemList = document.querySelectorAll('.list__item');
  itemList.forEach(item => {
    item.addEventListener('click', () => {
      countries.forEach(country => {
        if (country.name === item.textContent.trim()) {
          const language = country.languages.map(item => {
            return ' ' + item.name + checkNativeName(item.nativeName);
          });
          countryInfo.innerHTML = `<h2><img src="${
            country.flag
          }" class="flag-svg"> ${country.name}</h2>
          <p><b>Capital: </b>${country.capital}</p>
          <p><b>Population: </b>${convertToInternationalCurrencySystem(
            country.population
          )} <i>(${country.population})</i></p>
          <p><b>Languages: </b>${language}</p>`;
          countryList.innerHTML = '';
          const flag = document.querySelector('.flag-svg');
          countryInfo.style.fontSize = '30px';
          flag.style.width = '80px';
        }
      });
    });
  });
};
