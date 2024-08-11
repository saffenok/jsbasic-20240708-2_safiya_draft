function highlight(table) {
  // ваш код...
  let tBody = table.tBodies[0];
  for (let tr of tBody.rows) {
    let i = 0;
    for (let td of tr.cells) {
      if (i == 3) {
        if (td.dataset.available == "true") {
          tr.classList.add("available");
        } else if (td.dataset.available == "false") {
          tr.classList.add("unavailable");
        } else {
          tr.hidden = true;
        }
      }

      if (i == 2) {
        if (td.innerHTML == "m") {
          tr.classList.add("male");
        } else {
          tr.classList.add("female");
        }
      }

      if (i == 1) {
        if (td.innerHTML < '18') {
          tr.style.textDecoration = "line-through";
        }
      }

      i++;
    }
  }
}
