const DOM = {
    inputName: document.getElementById('nomeInput'),
    addNomeBtn: document.getElementById('addNomeBtn'),
    friendsList: document.getElementById('listaAmigos'),
    reiniciarBtn: document.getElementById('reiniciarBtn'),
    setupArea: document.getElementById('setup-area'),
    resultadosContainer: document.getElementById('resultados-container'),
    listaResultados: document.getElementById('lista-resultados'),
};

let friendList = [];
let sorteioResultado = [];

function addFriend() {
    let name = DOM.inputName.value.trim();
    try {
        validateName(name);
        friendList.push(name);
        clearInput();
        displayList();
    } catch (error) {
        console.error(error.message);
    }
}

function validateName(name) {
    if (!name) {
        showError('Por favor, informe um nome válido!');
        throw new Error('Nome inválido.');
    }
    if (name.length < 3) {
        showError('O nome deve ter pelo menos 3 caracteres!');
        throw new Error('Nome muito curto.');
    }
    if (friendList.includes(name)) {
        showError('Este nome já foi adicionado!');
        throw new Error('Nome duplicado.');
    }
    showError('');
}

function showError(msg) {
    const errorEl = document.getElementById('errorMessage');
    errorEl.textContent = msg || '';
}

function clearInput() {
    DOM.inputName.value = '';
    DOM.inputName.focus();
}

function displayList() {
    let ul = DOM.friendsList;
    ul.innerHTML = '';

    for (let i = 0; i < friendList.length; i++) {
        let li = document.createElement('li');
        li.textContent = friendList[i].toUpperCase();
        li.className = 'chipAmigo';

        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'x';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => removeFriend(i);

        li.appendChild(removeBtn);
        ul.appendChild(li);
    }
    updateSortearBtn();
}

function removeFriend(index) {
    friendList.splice(index, 1);
    displayList();
}

function updateSortearBtn() {
    let sorteioArea = document.getElementById('sorteio-area');
    let existingBtn = sorteioArea.querySelector('.sortearBtn');

    if (friendList.length >= 2) {
        if (!existingBtn) {
            let btn = document.createElement('button');
            btn.className = 'sortearBtn';
            btn.textContent = 'Sortear';
            sorteioArea.appendChild(btn);

            setTimeout(() => {
                btn.classList.add('show');
            }, 50);

            btn.addEventListener('click', realizarSorteio);
        }
    } else {
        if (existingBtn) {
            existingBtn.remove();
        }
    }
}

function realizarSorteio() {
    let shuffledFriends = [...friendList].sort(() => Math.random() - 0.5);
    sorteioResultado = [];

    for (let i = 0; i < shuffledFriends.length; i++) {
        const giver = shuffledFriends[i];
        const receiver = shuffledFriends[(i + 1) % shuffledFriends.length];
        sorteioResultado.push({ giver, receiver });
    }

    displayResults();
}

function displayResults() {
    document.body.classList.add('results-active');
    DOM.setupArea.style.display = 'none';
    DOM.resultadosContainer.style.display = 'block';
    DOM.reiniciarBtn.style.display = 'block';
    DOM.listaResultados.innerHTML = '';

    sorteioResultado.forEach(par => {
        // Cria o item da lista
        const item = document.createElement('div');
        item.className = 'resultado-item';

        const nome = document.createElement('span');
        nome.className = 'giver-name';
        nome.textContent = par.giver.toUpperCase();

        const arrow = document.createElement('span');
        arrow.className = 'arrow';
        arrow.textContent = '→';

        // Cria o cartão que vira
        const paperCard = document.createElement('div');
        paperCard.className = 'paper';

        const paperInner = document.createElement('div');
        paperInner.className = 'paper_inner';

        const paperFront = document.createElement('div');
        paperFront.className = 'paper_front';
        paperFront.textContent = 'REVELAR AMIGO';

        const paperBack = document.createElement('div');
        paperBack.className = 'paper_back';
        paperBack.textContent = par.receiver.toUpperCase();

        paperInner.appendChild(paperFront);
        paperInner.appendChild(paperBack);
        paperCard.appendChild(paperInner);

        // Adiciona evento de clique para virar o cartão
        paperCard.addEventListener('click', () => {
            paperCard.classList.toggle('flipped');
        });

        // Adiciona tudo ao item da lista
        item.appendChild(nome);
        item.appendChild(arrow);
        item.appendChild(paperCard);

        DOM.listaResultados.appendChild(item);
    });
}

function resetGame() {
    document.body.classList.remove('results-active');
    friendList = [];
    sorteioResultado = [];
    displayList();

    // Esconde a tela de resultados e mostra a de configuração
    DOM.resultadosContainer.style.display = 'none';
    DOM.setupArea.style.display = 'block';
    DOM.reiniciarBtn.style.display = 'none';
    DOM.listaResultados.innerHTML = '';
}

// Liga os eventos aos botões
DOM.addNomeBtn.addEventListener('click', addFriend);
DOM.reiniciarBtn.addEventListener('click', resetGame);

// Permitir adicionar amigo com tecla Enter
DOM.inputName.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addFriend();
    }
});

// Tema dark
const themeBtn = document.getElementById('themeToggle');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeBtn.textContent = '💡';
    } else {
        themeBtn.textContent = '🌙';
    }
});