const str="   hELLO WYD MACHAA";
const encodedStr1=str.replace(/ /g,"%20");
const encodedStr2=str.split(" ").join("%20");
console.log(encodedStr1);
console.log(encodedStr2);