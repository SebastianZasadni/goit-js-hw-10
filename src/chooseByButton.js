import {countryList, countryInfo} from '../src/index';
import {convertToInternationalCurrencySystem} from '../src/converterCurrency';
import {checkNativeName} from './checkNativeName';
import { chooseByButton } from './chooseByButton';

export const chooseByButton = (response) => {const itemList = document.querySelectorAll('.list__item');
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
};