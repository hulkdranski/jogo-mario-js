const mario = document.querySelector('#img-mario');
let pulando = false;
let voando = false;

const playSom = (elemento) => {
    const element = document.querySelector(`#${elemento}`);
    element.play();
};

const stopSom = (elemento) => {
    const element = document.querySelector(`#${elemento}`);
    element.pause();
};

const acoes_keydown = ({key}) => {
    if(key == 'ArrowUp'){
        if (pulando == false && voando == false){
            mario.classList.add('pular')
            playSom('audio-pulo');
            pulando = true;

            setTimeout(() => {
                mario.classList.remove('pular');
                pulando = false;
            }, 500);
        };
        

        
    } else if (key == ' '){
        if (pulando == false && voando == false){
            mario.classList.add('voar');
            playSom('audio-voar');
            mario.src = './img/mario-voando.png';
            voando = true;

            setTimeout(() => {
                mario.classList.remove('voar');
                mario.src = './img/mario.gif';
                voando = false;
            }, 1500)
        }
    } else if (key == 'ArrowDown'){
        if (pulando == false && voando == false){
            mario.classList.add('abaixar');
            mario.src = './img/mario-agachado.png';
            playSom('audio-agachado');
        }
    }
};

const acoes_keyup = ({key}) => {
    if (key == 'ArrowDown'){
        mario.classList.remove('abaixar');
        mario.src = './img/mario.gif'
    }
}

const limpar_texto = (limpar) => {
    limpar.value = '';
}



export{playSom, stopSom, acoes_keydown, acoes_keyup, limpar_texto, mario}