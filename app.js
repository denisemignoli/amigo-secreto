// Elementos DOM
const DOM = {
    inputName: document.querySelector('#nomeInput'),
    friendsList: document.getElementById('listaAmigos'),
    paperCard: document.getElementById('paperCard'),
    nameDisplay: document.getElementById('nomeAmigo'),
    reiniciarBtn: document.getElementById('reiniciarBtn'),
    addNomeBtn: document.getElementById('addNomeBtn'),
    embaralharBtn: document.getElementById('embaralharBtn')
};

let friendList = [];

// Valida e adiciona um novo amigo à lista
function addFriend() {
    let name = DOM.inputName.value.trim();
    validateName(name);
    friendList.push(name);
    clearInput();
    displayList();
    console.log(friendList);
}

function validateName(name) {
    if (!name) {
        alert('Por favor, informe um nome válido!');
        throw new Error('Por favor, informe um nome válido!');
    }
    if (name.length < 3) {
        alert('O nome deve ter pelo menos 3 caracteres!');
        throw new Error('O nome deve ter pelo menos 3 caracteres!');
    }
    if (friendList.includes(name)) {
        alert('Este nome já foi adicionado!');
        throw new Error('Este nome já foi adicionado!');
    }
}

function clearInput() {
    DOM.inputName.value = '';
}


function displayList() {
    let ul = DOM.friendsList;
    ul.innerHTML = '';

    for (let i = 0; i < friendList.length; i++) {
        let li = document.createElement('li');
        li.className = 'listaAmigos';
        li.textContent = friendList[i];

        let removeBtn = document.createElement('button');
        removeBtn.textContent = '✖';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => removeFriend(i);

        li.appendChild(removeBtn);
        ul.appendChild(li);
    }
}

function removeFriend(index) {
    friendList.splice(index, 1);
    displayList();
}

function pickRandomFriend() {
    if (friendList.length < 2) {
        alert('É necessário pelo menos 2 participantes para realizar o sorteio!');
        return;
    }
    let randomFriend = Math.floor(Math.random() * friendList.length);
    let selectedFriend = friendList[randomFriend];
    displaySelectedFriend(selectedFriend);
}

function displaySelectedFriend(selectedFriend) {
    let card = DOM.paperCard;
    let nomeDiv = DOM.nameDisplay;

    nomeDiv.innerHTML = selectedFriend;
    card.style.display = 'block';
    card.classList.remove('flipped');
}

function flipCard() {
    const card = DOM.paperCard;
    card.classList.toggle('flipped');
}

function resetGame() {
    friendList = [];
    displayList();
    const card = DOM.paperCard;
    card.style.display = 'none';
}

// Liga os eventos aos botões
DOM.addNomeBtn.addEventListener('click', addFriend);
DOM.paperCard.addEventListener('click', flipCard);
DOM.reiniciarBtn.addEventListener('click', resetGame);
DOM.embaralharBtn.addEventListener('click', pickRandomFriend);