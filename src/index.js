import './css/styles.css';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector("#search-box");
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
countryList.style.listStyle = "none";
countryList.style.fontSize = "30px";
document.querySelector('body').style.backgroundColor = "grey";

searchInput.addEventListener("input", 
_.debounce(() => {
  let searchValue = searchInput.value;
  searchValue = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
  
  fetchCountries(searchValue);
}, DEBOUNCE_DELAY));


  const fetchCountries = searchValue => { fetch(`https://restcountries.com/v2/name/${searchValue}`)
    .then((response) => {
    if (!response.ok) {
     return Notiflix.Notify.failure('Your country doesn"t exist.');
      
    }
  const countriesData = response.json();
  return countriesData;
}).then((response) => {
  if(response.length > 10){
   return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
  else{
    response.map(country => {
      
      if (country.name.startsWith(searchValue))
      { 
             
         markup =`<li><img src="${country.flag}" class="flag-svg"> ${country.name}</li>`;
          }
          })
          .join("");
          countryList.innerHTML = markup;
          const flags = document.querySelectorAll('.flag-svg')
          flags.forEach(flag => {
          flag.style.width = "30px";
          });  
  }
       }) 
      .catch((error) => {
      
          })
        };
