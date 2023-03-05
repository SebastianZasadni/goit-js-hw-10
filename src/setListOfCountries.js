import {countryList, countryInfo} from '../src/index';
import { chooseByButton } from './chooseByButton';

export const setListOfCountries = response => {
    const markup = response.map(country => {                         
        return `<li class="list__item" style="cursor: pointer; width: 400px;"><img src="${country.flag}" class="flag-svg"> ${country.name}</li>`;
          }
          )
          .join("");
          countryInfo.innerHTML = "";
          countryList.innerHTML = markup;
          const flags = document.querySelectorAll('.flag-svg')
          flags.forEach(flag => {
          flag.style.width = "30px";
          }); 
          chooseByButton(response);
        }