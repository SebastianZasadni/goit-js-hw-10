!function(){var n=document.querySelector("#search-box"),t=document.querySelector(".country-list");document.querySelector(".country-info");n.addEventListener("input",_.debounce((function(){c()}),300));var c=function(){fetch("https://restcountries.com/v3.1/all").then((function(n){return n.json()})).then((function(c){c.map((function(c){if(c.name.common===n.value){var e="<li>".concat(c.name.official,"</li>\n      <li>").concat(c.capital,"</li>\n      <li>").concat(c.population,"</li>\n      <li>").concat(c.flags.svg,"</li>\n      <li>").concat(Object.values(c.languages),"</li>");return t.innerHTML=e}}))}))}}();
//# sourceMappingURL=index.33e081f1.js.map