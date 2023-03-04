export const checkNativeName = (itemName) => {
    if (itemName === undefined){
        return ('');
    }
    else{
        return ` (<i>${itemName}</i>)`;
    }
  }