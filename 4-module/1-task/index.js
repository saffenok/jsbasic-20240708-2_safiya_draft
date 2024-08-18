function makeFriendsList(friends) {
  // ваш код...
  let list = document.createElement('UL');
  let firstName;
  let lastName;
  for (let person of friends) {
    firstName = person.firstName;
    lastName = person.lastName;
    let newLi = document.createElement('LI');
    newLi.innerHTML = `${firstName}` + " " + `${lastName}`;
    list.append(newLi);
  }
  return list;
}
