import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries }  from '../src/fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector("#search-box");
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
countryList.style.listStyle = "none";
countryList.style.fontSize = "30px";

const convertToInternationalCurrencySystem = labelValue => {

  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9

  ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
  // Six Zeroes for Millions 
  : Math.abs(Number(labelValue)) >= 1.0e+6

  ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
  // Three Zeroes for Thousands
  : Math.abs(Number(labelValue)) >= 1.0e+3

  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

  : Math.abs(Number(labelValue));

}

searchInput.addEventListener("input", 
_.debounce(() => {
  let searchValue = searchInput.value;
  searchValue = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
  fetchCountries(searchValue);
}, DEBOUNCE_DELAY));


  