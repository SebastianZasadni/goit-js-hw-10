import Notiflix from 'notiflix';
Notiflix.Notify.init({
    position: "center-top",
})

import './css/styles.css';
import { fetchCountries} from './fetchCountries';

const DEBOUNCE_DELAY = 300;

export const searchInput = document.querySelector("#search-box");
export const countryList = document.querySelector('.country-list');
export const countryInfo = document.querySelector('.country-info');

countryList.style.listStyle = "none";
countryList.style.fontSize = "30px";

searchInput.addEventListener("input", 
_.debounce(() => {
  let searchValue = searchInput.value;
    searchValue = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
    fetchCountries(searchValue);  
}, DEBOUNCE_DELAY));


 