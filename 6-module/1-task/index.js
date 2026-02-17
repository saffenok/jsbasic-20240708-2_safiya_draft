/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {

  constructor(rows) {
    this.rows = rows;
    this.table = document.createElement('TABLE');
    this.table.innerHTML = `<thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      </tbody>`;

    this.tbody = this.table.querySelector('tbody');

    this.fillTable();
  }

  fillTable() {
    for (let row of this.rows) {
      let tableRow = document.createElement('TR');
      for (let key in row) {
        tableRow.insertAdjacentHTML('beforeend', `<td>${row[key]}</td>`);
      }
      tableRow.insertAdjacentHTML('beforeend', `<td><button>X</button></td>`);
      this.tbody.append(tableRow);
    }

    // удалить строчку при клике
    this.table.addEventListener('click', this.deleteRow);
  }

  deleteRow(event) {
    if (!event.target.closest('button')) return;

    event.target.closest('tr').outerHTML = '';
  }

  get elem() {
    return this.table;
  }

}
