function showSalary(users, age) {
  let objectsArr = users.filter((user) => {
    return user.age <= age;
  });

  let resultStr = '';
  objectsArr.map((user, i = 0) => {
    i++;
    resultStr += user.name + ', ' + user.balance;
    if (i != objectsArr.length) {
      resultStr += '\n';
    }
  });
  return resultStr;
}
