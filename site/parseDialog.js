


export function parseDialog(chat){
    chat = chat
        .replace(/"/g, '')
        .replace(/'/g, '')
        .replace(/\n/g, '\\n')
        .replace(/`/g, '');

    if (localStorage.conversation === undefined) {
        localStorage.conversation = JSON.stringify([chat])
    }
    else {
        let a = JSON.parse(localStorage.conversation)
        a.push(chat)
        localStorage.conversation = JSON.stringify(a)
    }
}





export function startDialog(chat){
    if (localStorage.conversation === undefined){}
    else {
        let arr = JSON.parse(localStorage.conversation)

        for(let i = 0; i < arr.length; i++) {
            if (arr[i][0] === 'Y'){
                var atr = 'you'  
            } else if (arr[i][0] === 'G'){
                var atr = 'gpt'
            } else{
                var atr = 'und'
            }

            let msg = document.createElement('div');
            msg.setAttribute('class', atr)
            chat.appendChild(msg)
            chat.lastChild.innerHTML = arr[i]
        }
    }
}