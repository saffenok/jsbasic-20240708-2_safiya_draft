function filterRange(arr, a, b) {
  // ваш код...
  let newArray = [];
  let arrayElem = arr.filter((number) => {
    if ((number >= a && number <= b) || (number <= a && number >= b)) {
      newArray.push(number);
    }
  });
  return newArray;
}
