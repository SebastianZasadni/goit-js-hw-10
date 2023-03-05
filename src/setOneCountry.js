import Notiflix from 'notiflix';
Notiflix.Notify.init({
    position: "center-top",
})

import {countryList, countryInfo} from '../src/index';
import {convertToInternationalCurrencySystem} from '../src/converterCurrency';
import {checkNativeName} from './checkNativeName';

export const setOneCountry = response => {
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
};