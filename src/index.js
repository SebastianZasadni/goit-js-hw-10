import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'center-top',
});

import { fetchCountries } from './fetchCountries';
import { checkNativeName } from './checkNativeName';
import { convertToInternationalCurrencySystem } from './converterCurrency';

const DEBOUNCE_DELAY = 300;

export const searchInput = document.querySelector('#search-box');
export const countryList = document.querySelector('.country-list');
export const countryInfo = document.querySelector('.country-info');

countryList.style.listStyle = 'none';
countryList.style.fontSize = '30px';

const checkCountries = _.debounce(() => {
  let searchValue = searchInput.value;
  searchValue = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  fetchCountries(searchValue)
  .then(data => checkAmountOfCountries(data))
  .catch(error =>  {return Notiflix.Notify.failure(
          'Oops, there is no country with that name.'
        )});
}, DEBOUNCE_DELAY);

searchInput.addEventListener('input', checkCountries);


checkAmountOfCountries = data => {
  if (data.length == 1) {
    setOneCountry(data);
  } else if (data.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    setListOfCountries(data);
  }
};

const setListOfCountries = data => {
  const markup = data
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
  chooseByButton(data);
};

const setOneCountry = data => {
  const country = data[0];
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

const chooseByButton = data => {
  const itemList = document.querySelectorAll('.list__item');
  itemList.forEach(item => {
    item.addEventListener('click', () => {
      data.forEach(country => {
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
