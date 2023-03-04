export const fetchCountries = searchValue => { fetch(`https://restcountries.com/v2/name/${searchValue}?fields=name,capital,population,languages,flag`)
    .then((response) => {
    if (!response.ok) {
     return Notiflix.Notify.failure('Oops, there is no country with that name.');
      
    }
  const countriesData = response.json();
  return countriesData;
}).then((response) => {
  if(response.length === 1){
  //  return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  const country = response[0];
  const language = country.languages.map(item => {return " " + (item.name)});
  const markup = `<h2><img src="${country.flag}" class="flag-svg"> ${country.name}</h2>
   <p><b>Capital: </b>${country.capital}</p>
   <p><b>Population: </b>${convertToInternationalCurrencySystem(country.population)}</p>
   <p><b>Languages: </b>${language}</p>`;
   countryList.innerHTML = "";
   countryInfo.innerHTML = markup;
   const flag = document.querySelector('.flag-svg')
   countryInfo.style.fontSize = "50px";
   flag.style.width = "80px";

  }
  else{
    const markup = response.map(country => {                         
        return `<li><img src="${country.flag}" class="flag-svg"> ${country.name}</li>`;
          }
          )
          .join("");
          countryInfo.innerHTML = "";
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
