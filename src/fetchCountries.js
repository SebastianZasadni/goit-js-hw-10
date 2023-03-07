import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'center-top',
});

export const fetchCountries = async searchValue => {
      const response = await fetch(
      `https://restcountries.com/v2/name/${searchValue}?fields=name,capital,population,languages,flag`
    );
    const countries = await response.json();
    return countries;
   };
