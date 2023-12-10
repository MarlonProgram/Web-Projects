console.log("A")

let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.getElementById('screen');
console.log(screen);

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        
        case '=':
            if(previousOperator === null){
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;

        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.toString(0, buffer.length - 1);
            }
            break;
        
        case'+':
        case'−':
        case'×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer;
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

document.querySelectorAll('.calc-boton').forEach((button) => {
    button.addEventListener('click', (event) => {
        buttonClick(event.target.innerText);
    });
});

document.onkeyup = (event) => {
    const validsNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9','0'];
    const validSymbols = ['+', '-', 'x', '*', '/', '%', 'C', 'c', '='];
    const key = event.key;
    const transforms = {
        '+': '+',
        '-': '−',
        'x': '×',
        '*': '×',
        '/': '÷',
        'c': 'C',
        'C': 'C',
        '=': '=',
    }
    console.log(key);
        if (validsNumbers.includes(key)) 
            handleNumber(key);
        else if (validSymbols.includes(key)) 
            handleSymbol(transforms[key]);
        else 
            console.log("Invalido nojoda")
        
        screen.innerText = buffer;


}