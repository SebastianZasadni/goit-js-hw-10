import Notiflix from 'notiflix';
Notiflix.Notify.init({
    position: "center-top",
})

import { setOneCountry } from './setOneCountry';
import { setListOfCountries } from './setListOfCountries';

export const checkAmountOfCountries = (response) => { if(response.length === 1){ 
    setOneCountry(response);       
        }
    else if(response.length > 10){
      return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    else{
      setListOfCountries(response);
                           }
  };