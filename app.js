let nameList = [];

function addFriend() {
    let name = document.querySelector('input').value;
    nameList.push(name);
    console.log(nameList);
    displayList();
    clearInput();
}

function displayList() {
    let ul = document.getElementById('friendList');
    ul.innerHTML = nameList;
}

function clearInput() {
    document.querySelector('input').value = '';
}