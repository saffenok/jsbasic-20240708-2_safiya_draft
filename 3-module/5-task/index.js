function getMinMax(str) {
  let strArr = str.split(' ');
  let numArr = []
  let result = {};
  for (let i = 0; i < strArr.length; i++) {
    strArr[i] = Number(strArr[i]);
    if (! Number.isNaN(strArr[i]) ) {
      numArr.push(strArr[i]);
    }
  }
  result.min = Math.min(...numArr);
  result.max = Math.max(...numArr);
  return result;
}
