function truncate(str, maxlength) {
  if (str.length > maxlength) {
    let finalStr = "";
    for (let i = 0; i < (maxlength - 1); i++) {
      finalStr += str[i];
    }
    finalStr += "…";
    return finalStr;
  } else {
    return str;
  }
}
