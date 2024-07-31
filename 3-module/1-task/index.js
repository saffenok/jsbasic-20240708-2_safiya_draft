function namify(users) {
  // ваш код...
  let namesArray = [];
  let name = users.map((user) => {
     namesArray.push(user.name);
  });
  return namesArray;
}
