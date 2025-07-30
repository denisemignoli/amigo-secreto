let friendList = [];

function addFriend() {
    let name = document.querySelector('input').value.trim();
    if (name === '') {
        alert('Por favor, informe um nome válido!');
        return;
    }
    if (friendList.includes(name)) {
        alert('Este nome já foi adicionado!');
        clearInput();
        return;
    }
    friendList.push(name);
    displayList();
    clearInput();
    console.log(friendList)
}

function displayList() {
    let ul = document.getElementById('friendList');
    ul.innerHTML = '';

    friendList.forEach((friend, index) => {
        let li = document.createElement('li');
        li.className = 'friend-item';

        let span = document.createElement('span');
        span.textContent = friend;

        let removeBtn = document.createElement('button');
        removeBtn.textContent = '✖';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => removeFriend(index);

        li.appendChild(span);
        li.appendChild(removeBtn);
        ul.appendChild(li);
    });
}

function removeFriend(index) {
    friendList.splice(index, 1);
    displayList();
}

function clearInput() {
    document.querySelector('input').value = '';
}

function pickRandomFriend() {
    if (friendList.length < 2) {
        alert('É necessário pelo menos 2 participantes para realizar o sorteio!');
        return;
    }
    let randomIndex = Math.floor(Math.random() * friendList.length);
    let selectedFriend = friendList[randomIndex];

    let paragrafo = document.getElementById('selectedFriend');
    paragrafo.innerHTML = 'Seu amigo secreto é: ';
    displaySelectedFriend(selectedFriend);
    console.log(selectedFriend);
}

function displaySelectedFriend(selectedFriend) {
    let result = document.getElementById('result');
    result.innerHTML = selectedFriend;
    result.className = 'friend-selected';
}
