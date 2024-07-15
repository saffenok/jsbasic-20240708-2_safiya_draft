function ucFirst(str) {
  if (str.length) {
    let firstSymbol = str[0].toUpperCase();
    let finalStr = firstSymbol;
    for (let i = 1; i < str.length; i++) {
      finalStr += str[i];
    }
    return finalStr;
  } else {
    return str;
  }
}
