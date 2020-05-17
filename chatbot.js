const tmi = require('tmi.js');
const util = require('util');
const NOME_BOT = 'chatebote';
const NOME_CANAL = 'abeelz';
const TOKEN = 'oauth:la1vx8yd6hwberdstqhdz7jh6m15wq';
const twitter = 'https://twitter.com/dandyBeel';
const youtube = 'https://www.youtube.com/channel/UCwoS-XI7hkqYbMB9NhgBdMA'

const opts = {
    identity:{
        username: NOME_BOT,
        password: TOKEN
    },
    channels: [NOME_CANAL]
};

const listComandos = ['!desespero','!tempo-transmissao','!twitter','!d6',!'youtube']
//recebe mensagem chat
//contexto.username = user do usuario onde esta o chatbot
function mensagemChegou(alvo, contexto, mensagem, ehBot){
    if(ehBot){
        return;
    }
    
    const nomeDoComando = mensagem.trim();
    if(nomeDoComando === '!teste'){
        console.log(`* Foi executado o comando ${nomeDoComando}`)
        client.say(alvo, `Você pediu para executar o comando ${nomeDoComando} ${contexto.username}`)
    } else if(nomeDoComando=== listComandos[0]){
        countDesespero(alvo,mensagem);
    }else if(nomeDoComando === listComandos[1]){
        tempoTransmissao(alvo,mensagem);
    }else if(nomeDoComando === '!comandos'){
        comandos(alvo,contexto,mensagem);
    }else if(nomeDoComando === listComandos[2]){
        twitterFunc(alvo,contexto,mensagem);
    }else if(nomeDoComando === listComandos[3]){
        dado6(alvo,contexto,mensagem);
    }else if(nomeDoComando === listComandos[4]){
        youtubeFunc(alvo,contexto,mensagem);
    }else{
        noSpam(alvo,contexto,mensagem);
        console.log(`* ${contexto.username}  - Não conheço ${nomeDoComando}`)
    }
}

//entra na twitch
function entrouNaTwitch(endereco,porta){
    console.log(`* Bot entrou no endereço ${endereco}:${porta}`)
}

//id cliente twitch api

//Cria um client tmi
const client = new tmi.client(opts);

//registra funcoes
client.on('message',mensagemChegou);
client.on('connected',entrouNaTwitch);
//Connecta na Twitch:
client.connect();

//Variaveis para comandos distintos
var countDesesperoValue = 0;
const initialTime = Date.now();

function countDesespero(target,message){ 
    
    countDesesperoValue = countDesesperoValue+1;
    console.log(`* Foi executado o comando ${message}`)
    client.say(target, `${NOME_CANAL} entrou em desespero ${countDesesperoValue}
     vezes hoje.`)
}

function tempoTransmissao(target,message){
    let actualTime = Date.now();
    let tempoTransmissaoValue = Math.floor((actualTime - initialTime)/1000);
    let horasTransmissao = Math.floor(tempoTransmissaoValue/3600);
    let minSemHora = tempoTransmissaoValue%3600;
    let minutosTransmissao = Math.floor(minSemHora/60);
    let segundosTransmissao = minSemHora%60;
    console.log(`* Foi executado o comando ${message}`)
    client.say(target, `${NOME_CANAL} está conectado há ${converterPara2Casa(horasTransmissao)}:${converterPara2Casa(minutosTransmissao)}:${converterPara2Casa(segundosTransmissao)} horas.`)
}

function comandos(target,context,message){
    console.log(`* Foi executado o comando ${message}`)
    client.say(target, `${listComandos}`)
}

function noSpam(target,context,message){
    if(message.length > 280){
        client.say(target, `${context.username} sem textão, por favor. O que você digitou é mais do que cabe em um twitter`)
        if(context.mod === false && !("#"+context.username.trim() === target)){
            client.timeout (target,context.username,30);
        }
    }
}

function twitterFunc(target,context,message){
    client.say(target, `${context.username} => O twitter do ${NOME_CANAL} é: ${twitter}`)
}

function youtubeFunc(target,context,message){
    client.say(target, `${context.username} => O youtube do ${NOME_CANAL} é: ${youtube}`)
}

function dado6(target,context,message){
    let d6 = Math.floor(Math.random()*(6)+1);
    client.say(target, `${context.username} => Você tirou ${d6} no dado`)
}

//Auxiliares
function converterPara2Casa(number){
    if(number < 10){
        return "0"+number;
    }else{
        return number;
    }
}

//COMANDOS: d4,d6,d20,d100,instagram, 
//client id = 0zq0d84zf114992l6y38rlji6diprj
//cliente secrect key = mWyVtrY2JTH+qggPwkaAa3LfB1txjmpyqpUXnEP5f2w=