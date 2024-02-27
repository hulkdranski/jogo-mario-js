//imports
//import { getItem, setItem, bancoLocal } from "./connection.js";
import * as connection from './connection.js'
import * as modulos from './modulo.js'

//elementos
const audio_abertura = document.querySelector('#audio-abertura');
const input_jogador = document.querySelector('#inputJogador');
const btn_start = document.querySelector('#btn-start');
const modal_login = document.querySelector('#modal-login');
const modal_game_over = document.querySelector('#modal-game-over');
const modal_ranking = document.querySelector('#modal-ranking');
const modal = document.querySelector('#modal');
const sleep = document.querySelector('#sleep');
const txt_nome_jogador = document.querySelector('#txtNomeJogador');
const txt_contagem = document.querySelector('#txt-contagem');
const cenario = document.querySelector('#cenario');
const txt_tempo = document.querySelector('#txtTempo');
const img_tubo =  document.querySelector('#img-tubo');
const img_bala =  document.querySelector('#img-bala');
const img_moedas = document.querySelectorAll('#img-moeda');
const img_estreals = document.querySelectorAll('#img-estrela');
const txt_moedas = document.querySelector('#txtMoedas');
const txt_estreals = document.querySelector('#txtEstrelas');
const btn_reiniciar = document.querySelectorAll('#btn-reiniciar');
const btn_ranking = document.querySelector('#btn-ranking');
const tabela_informacoes = document.querySelector('#tabela-ranking')




// variaveis
let nomeJogador;
let moedasJogador = 0;
let estrelasJogador = 0;
let tempoJogador = 0;
let pontuacaoJogador = 0;

let tempo_contagem;
let tempo_jogo;
let tempo_pegar_elementos;
let loop_controle_partida;

const validar_jogador = ({target}) => {
    if (target.value.length >= 3){
        nomeJogador = target.value.trim().toUpperCase();
        btn_start.removeAttribute('disabled');

        btn_start.addEventListener('click', start);
        document.addEventListener('keypress', ({key}) => {
            if (key == 'Enter' && target.value.length >= 3)
                start();
        });
    } else {
        btn_start.setAttribute('disabled', '')
    }
}
document.addEventListener('input', validar_jogador);

const start = () => {
    audio_abertura.pause();
    modulos.limpar_texto(input_jogador);
    document.addEventListener('keydown', modulos.acoes_keydown);
    document.addEventListener('keyup', modulos.acoes_keyup);
    modulos.playSom('audio-principal');
    btn_start.setAttribute('disabled', '');
    modal_login.classList.remove('active');
    modal.classList.remove('habilitar');
    sleep.classList.add('active');
    txt_nome_jogador.textContent = nomeJogador;
    tempo_contagem = setInterval(() =>{
        let cont = txt_contagem.textContent;
        cont--;
        txt_contagem.textContent = cont  ;   
    }, 1000);

    setTimeout(() => {
        sleep.classList.remove('active');
        cenario.classList.add('iniciar');
        clearInterval(tempo_contagem);
        timer();
        mover_elementos(img_tubo);
        mover_elementos(img_bala, 1.5);
        pegar_elementos();
        controle_partida();
    }, 5000);

    
}

const timer = () => {
        tempo_jogo = setInterval(() => {
        tempoJogador = txt_tempo.textContent;
        tempoJogador++;
        txt_tempo.textContent = tempoJogador;
    }, 1000)
}

const mover_elementos = (elemento, delay = 0) =>{
    const tempo_mover_elementos = setInterval(() =>{
        if (tempoJogador <= 10){
            elemento.style.animation = `move-cenario 3s linear infinite ${delay}s`;
        } else if (tempoJogador <= 20){
            elemento.style.animation = `move-cenario 2.8s linear infinite ${delay}s`;
        } else if (tempoJogador <= 30){
            elemento.style.animation = `move-cenario 2.6s linear infinite ${delay}s`;
        } else if (tempoJogador <= 40){
            elemento.style.animation = `move-cenario 2.4s linear infinite ${delay}s`;
        } else if (tempoJogador <= 50){
            elemento.style.animation = `move-cenario 2.2s linear infinite ${delay}s`;
        } else if (tempoJogador <= 60){
            elemento.style.animation = `move-cenario 2s linear infinite ${delay}s`;
        } else if (tempoJogador <= 70){
            elemento.style.animation = `move-cenario 1.5s linear infinite ${delay}s`;
        } else if (tempoJogador > 80){
            elemento.style.animation = `move-cenario 1s linear infinite ${delay}s`;
        }
    }, 1)
}

const pegar_elementos = () => {
    tempo_pegar_elementos = setInterval(() => {
        let posicao_mario_bottom = window.getComputedStyle(modulos.mario).bottom.replace('px', ''); 
        let posicao_mario_top = modulos.mario.offsetTop;
        
        img_moedas.forEach((items) => {
            let posicao_moedas_left = items.offsetLeft;

            if (posicao_moedas_left < 150 && (posicao_mario_bottom > 120 && posicao_mario_bottom < 250)){
                items.style.display = 'none';
                modulos.playSom('audio-moeda');
                moedasJogador++;
                txt_moedas.textContent = moedasJogador;

                setTimeout(() => {
                    items.style.display = 'block';
                }, 200);
            }
        })

        img_estreals.forEach((items) =>{
            let posicao_estrela_left = items.offsetLeft;

            if((posicao_estrela_left < 350 && posicao_estrela_left > 150) && posicao_mario_top < 250){
                items.style.display = 'none';
                modulos.playSom('audio-estrela');
                estrelasJogador++;
                txt_estreals.textContent = estrelasJogador;

                setTimeout(() => {
                    items.style.display = 'block';
                }, 450);

            }
        })
    }, 200);
}

const controle_partida = () => {
    loop_controle_partida = setInterval(() =>{
        let posicao_tubo_left = img_tubo.offsetLeft;
        let posicao_bala_left = img_bala.offsetLeft;
        let altura_mario = modulos.mario.offsetHeight;
        let posicao_mario_bottom = window.getComputedStyle(modulos.mario).bottom.replace('px', '');

        if((posicao_tubo_left < 130 && posicao_tubo_left > 50)&& posicao_mario_bottom < 110){
            img_tubo.style.animation = 'none';
            img_tubo.style.left = `${posicao_tubo_left}px`;
            modulos.mario.src = './img/mario-game-over.png';
            modulos.mario.style.animation = 'none';
            modulos.mario.style.bottom = `${posicao_mario_bottom}px`;
            modulos.mario.style.width = '70px';
            modulos.mario.style.left = '50px';
            game_over();
        }

        if((altura_mario > 95 && posicao_mario_bottom < 195) && (posicao_bala_left < 110 && posicao_bala_left > 50)){
            img_bala.style.animation = 'none';
            img_bala.style.left = `${posicao_bala_left}px`;
            modulos.mario.src = './img/mario-game-over.png';
            modulos.mario.style.animation = 'none';
            modulos.mario.style.bottom = `${posicao_mario_bottom}px`;
            modulos.mario.style.width = '70px';
            modulos.mario.style.left = '50px';
            game_over();
        }

    }, 50)
}

const game_over = () => {
    modulos.stopSom('audio-principal')
    modulos.playSom('audio-game-over');
    clearInterval(tempo_pegar_elementos);
    clearInterval(tempo_jogo);
    clearInterval(loop_controle_partida);
    document.removeEventListener('keydown', modulos.acoes_keydown);
    document.removeEventListener('keyup', modulos.acoes_keyup);
    calcular_pontuacao();
}

const reiniciar_partida = () => {
    modulos.stopSom('audio-game-over');
    modulos.playSom('audio-abertura');
    location.reload(true);
}
btn_reiniciar.forEach((items) => {
    items.addEventListener('click', reiniciar_partida)
})

const tela_ranking = () => {
    modulos.stopSom('audio-game-over');
    modulos.playSom('audio-ranking')
    modal_game_over.classList.remove('active');
    modal_ranking.classList.add('active');

    tabela_ranking();
}

const calcular_pontuacao = () => {
    pontuacaoJogador = (tempoJogador) + (moedasJogador * 2) + (estrelasJogador * 5);
    connection.bancoLocal(nomeJogador, moedasJogador, estrelasJogador, tempoJogador, pontuacaoJogador);
    modal.classList.add('habilitar');
    modal_game_over.classList.add('active');
    btn_ranking.addEventListener('click', tela_ranking)
}

const colocacao = (a, b) => {
    return a.pontuacaoJogador > b.pontuacaoJogador ? -1
    : a.pontuacaoJogador < b.pontuacaoJogador ? 1
    : 0
}

const tabela_ranking = () => {
    const dados_banco = connection.getItem().sort(colocacao);

    dados_banco.forEach((item, index) =>{
        criar_tabela(index + 1, item.nomeJogador, item.moedasJogador, item.estrelasJogador, item.tempoJogador, item.pontuacaoJogador)
    })
}

const criar_tabela = (posicao, nome, moedas, estrelas, tempo, pontuacao) => {
    const tabela_ranking = document.createElement('tr');
    tabela_ranking.classList = 'linha';

    tabela_ranking.innerHTML = `
        <tr class="linha">
            <td class="coluna">${posicao}</td>
            <td class="coluna">${nome}</td>
            <td class="coluna">${moedas}</td>
            <td class="coluna">${estrelas}</td>
            <td class="coluna">${tempo}</td>
            <td class="coluna">${pontuacao}</td>
        </tr>
    `

    tabela_informacoes.appendChild(tabela_ranking)
}