!function(){var n=document.querySelector("#search-box"),o=document.querySelector(".country-list");document.querySelector(".country-info");n.addEventListener("input",_.debounce((function(){t()}),300));var t=function(){var t=fetch("https://restcountries.com/v3.1/all");t.then((function(n){if(!n.ok)throw new Error(n.status);return n.json()})).then((function(c){return c.map((function(t){if(t.name.common===n.value){var c="<li>".concat(t.name.official,"</li>\n      <li>").concat(t.capital,"</li>\n      <li>").concat(t.population,"</li>\n      <li>").concat(t.flags.svg,"</li>\n      <li>").concat(Object.values(t.languages),"</li>");return o.innerHTML=c}})),t.catch((function(n){console.log("Error")})),console.log("nie ma takiego kraju")}))}}();
//# sourceMappingURL=index.7ce7bfd0.js.map
