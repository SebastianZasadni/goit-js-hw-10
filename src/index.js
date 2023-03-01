import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const inputBtn = document.querySelector("#search-box");
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputBtn.addEventListener("input", 
_.debounce(() => {
 checkCountries();
}, DEBOUNCE_DELAY));

const checkCountries = () => {
  const fetchCountries = fetch('https://restcountries.com/v3.1/all');
  fetchCountries.then((response) => {
  const countriesData = response.json();
  return countriesData;
}).then((response) => {
    response.map(country=>{
    if(country.name.common === inputBtn.value){
      const markup = `<li>${country.name.official}</li>
      <li>${country.capital}</li>
      <li>${country.population}</li>
      <li>${country.flags.svg}</li>
      <li>${Object.values(country.languages)}</li>`;
            return countryList.innerHTML = markup;
        }
        
     })
  })
};
