import { parseDialog, startDialog } from './parseDialog.js';

document.querySelector('.send').onclick = getText
document.querySelector('.delete').onclick = deleteChat

var chat = document.getElementById('chat');

startDialog(chat)


document.addEventListener('keydown', function(event) {
    if (event.code == 'Enter') {
        getText()
    }
});

async function getGpt(text) {
    let gpt = document.createElement('div');
    gpt.setAttribute('class', 'gpt')
    chat.appendChild(gpt)
    chat.lastChild.innerHTML = 'Gpt4: Генерация...'
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let context
    if (localStorage.conversation === undefined){ context = 'None' }
    else { context = JSON.parse(localStorage.conversation)}

    let myBody = JSON.stringify({
        "promt": text,
        "context": context
    });
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: myBody,
        redirect: 'follow'
    };

    document.querySelector('.input').value = ''

    let response = await fetch("/api", requestOptions);
    response = await response.json()
    chat.lastChild.innerHTML = 'Gpt4: ' + response[0]

    parseDialog(chat.lastChild.innerText)
}


function getText() {
    let text = document.querySelector('.input').value
    if (text !== ''){
        let you = document.createElement('div');
        you.setAttribute('class', 'you')
        chat.appendChild(you)
        chat.lastChild.innerHTML = 'You: ' + text

        parseDialog(chat.lastChild.innerText)
        getGpt(text)
    }
}






function deleteChat() {
    delete localStorage.conversation
    chat.innerHTML = ''
}

