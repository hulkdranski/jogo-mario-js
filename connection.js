const setItem = (dados) => {
    localStorage.setItem('banco-mario', dados)
};

const getItem = () => {
    return JSON.parse(localStorage.getItem('banco-mario')) ?? []
};

const bancoLocal = (nome, moedas, estrelas, tempo, pontuacao) => {
    let banco = getItem();
    
    let dados = {
        nomeJogador: nome,
        moedasJogador: moedas,
        estrelasJogador: estrelas,
        tempoJogador: tempo,
        pontuacaoJogador: pontuacao
    };

    banco.unshift(dados);

    setItem(JSON.stringify(banco))
};

export {bancoLocal, getItem}