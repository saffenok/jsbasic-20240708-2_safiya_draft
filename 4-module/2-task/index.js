function makeDiagonalRed(table) {
  // ваш код...
  let i = 0;
  for (let tr of table.rows) {
    let j = 0;
    for (let td of tr.cells) {
      if (i == j) {
        td.style.backgroundColor = "red";
      }
      j++;
    }
    i++;
  }
}
