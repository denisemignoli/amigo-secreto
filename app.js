let friendList = [];

function addFriend() {
    let name = document.querySelector('input').value;
    if (name != '') {
        friendList.push(name);
        console.log(friendList);
        displayList();
        clearInput();
    } else {
        alert('Por favor, informe um nome válido!')
    }
}

function displayList() {
    let ul = document.getElementById('friendList');
    ul.innerHTML = friendList;
}

function clearInput() {
    document.querySelector('input').value = '';
}

function pickRandomFriend() {
    let randomIndex = Math.floor(Math.random() * friendList.length);
    let selectedFriend = friendList[randomIndex];
    displaySelectedFriend(selectedFriend);
    console.log(selectedFriend);
}

function displaySelectedFriend(selectedFriend) {
    let result = document.getElementById('result');
    result.innerHTML = selectedFriend;
}
