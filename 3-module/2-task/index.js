function filterRange(arr, a, b) {
  // ваш код...
  let newArray = arr.filter((number) => {
    if ((number >= a && number <= b) || (number <= a && number >= b)) {
      return number;
    }
  });
  return newArray;
}
