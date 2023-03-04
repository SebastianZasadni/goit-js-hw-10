export const fetchCountries = searchValue => { fetch(`https://restcountries.com/v2/name/${searchValue}?fields=name,capital,population,languages,flag`)
.then((response) => {
if (!response.ok) {
 return Notiflix.Notify.failure('Oops, there is no country with that name.');
      }
const countriesData = response.json();
return countriesData;
    })