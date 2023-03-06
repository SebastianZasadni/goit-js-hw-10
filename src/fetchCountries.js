import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'center-top',
});

import { checkAmountOfCountries } from './index';

export const fetchCountries = searchValue => {
  fetch(
    `https://restcountries.com/v2/name/${searchValue}?fields=name,capital,population,languages,flag`
  )
    .then(response => {
      if (!response.ok) {
        return Notiflix.Notify.failure(
          'Oops, there is no country with that name.'
        );
      }
      const countriesData = response.json();
      return countriesData;
    })
    .then(data => {
      checkAmountOfCountries(data);
    })
    .catch(error => {
      return console.log('Error! Connection timeout or no country.');
    });
};
