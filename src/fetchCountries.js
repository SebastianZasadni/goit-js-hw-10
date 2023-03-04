import {countryList, countryInfo} from '../src/index';
import {convertToInternationalCurrencySystem} from '../src/converterCurrency';
import {checkNativeName} from './checkNativeName';

import Notiflix from 'notiflix';
Notiflix.Notify.init({
    position: "center-top",
})

export const fetchCountries = searchValue => { fetch(`https://restcountries.com/v2/name/${searchValue}?fields=name,capital,population,languages,flag`)
.then((response) => {
if (!response.ok) {
 return Notiflix.Notify.failure('Oops, there is no country with that name.');
      }
const countriesData = response.json();
return countriesData;
    })
  .then((response) => {
  if(response.length === 1){ 
           
  const country = response[0];
  const language = country.languages.map(item => {return " " + (item.name) + checkNativeName(item.nativeName)});
  countryInfo.innerHTML = `<h2><img src="${country.flag}" class="flag-svg"> ${country.name}</h2>
  <p><b>Capital: </b>${country.capital}</p>
  <p><b>Population: </b>${convertToInternationalCurrencySystem(country.population)} <i>(${country.population})</i></p>
  <p><b>Languages: </b>${language}</p>`;
   countryList.innerHTML = "";
   const flag = document.querySelector('.flag-svg')
   countryInfo.style.fontSize = "30px";
   flag.style.width = "80px";
  }
  else if(response.length > 10){
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
  else{
    const markup = response.map(country => {                         
        return `<li class="list__item"><img src="${country.flag}" class="flag-svg"> ${country.name}</li>`;
          }
          )
          .join("");
          countryInfo.innerHTML = "";
          countryList.innerHTML = markup;
          const flags = document.querySelectorAll('.flag-svg')
          flags.forEach(flag => {
          flag.style.width = "30px";
          }); 

          const itemList = document.querySelectorAll('.list__item');
          itemList.forEach(item => {
          item.addEventListener('click', () => {
            response.forEach(country => {
                if (country.name === item.textContent.trim()){
                    const language = country.languages.map(item => {return " " + (item.name) + checkNativeName(item.nativeName)});
                    countryInfo.innerHTML = `<h2><img src="${country.flag}" class="flag-svg"> ${country.name}</h2>
                    <p><b>Capital: </b>${country.capital}</p>
                    <p><b>Population: </b>${convertToInternationalCurrencySystem(country.population)} <i>(${country.population})</i></p>
                    <p><b>Languages: </b>${language}</p>`;
                     countryList.innerHTML = "";
                     const flag = document.querySelector('.flag-svg')
                     countryInfo.style.fontSize = "30px";
                     flag.style.width = "80px";
                }
            })
          })
          })
                     
  }
       }) 
      .catch((error) => {
      
          })
};
