function camelize(str) {
  let strArr = str.split("-"); // [back, color]
  strArr.map((word, i = 0) => {
    if (i != 0) {
      let wordArr = word.split(""); // [c, o, l, o, r]
      wordArr[0] = wordArr[0].toUpperCase();
      let modifyWord = wordArr.join(""); // [Color]
      strArr[i] = modifyWord;
    }
    i++;
  });
  return strArr.join("");
}
