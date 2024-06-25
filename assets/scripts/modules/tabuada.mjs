
import { formata_tempo, starttimer,stopTimer,minutes,seconds,milleseconds } from "./cronometro.mjs";
import { operador } from "./operação.mjs";
// container que as contas serão printadas
const containerE1 = document.querySelector('#contas-container');

// cabeçalho da página HTML
const cabecalho = document.querySelector('.cabecalho');

// Main container
const mainE1 = document.querySelector('#main');

// container onde os botãos estão inseridos
const botoes = document.querySelector('.container-botoes');

// Botão de iniciar
export const button = document.querySelector('#botão');

// Cronometro
const cronometroE1 = document.querySelector('.time');

//  array com com os valroes da tabuada estática


// variavel acomuladora
let contador = 0;

let acerto = 0;
let erro = 0;

// contas erradas serão armazenadas aqui.
const contas_erradas = []

//Gera a tabuada.
export function gerar_tabuada(){

    // Lista com os valores de todas as contas geradas
    const valores = [];

    // laço de repetição. Intuito é repetir x vezes para criar x contas.
    for (let c = 1; c<=54;c++){

        // Gera números aléatorios de 1 até 9.
        let n1 = Math.floor((Math.random() * 9) + 1);
        let n2 = Math.floor((Math.random() * 9) + 1);

        // Adiciona os números gerados em uma lista [realocando sua posição].
        const vlr = formata_para_naturais([n1,n2]);

        // Adiciona os números gerados em uma lista externa.
        valores.push(vlr);
    
    }
    
    // retorna uma array com todas as contas geradas.

    return valores;

}

// Realoca a posição dos  números para que seus resultados sejam sempre naturais[N]
function formata_para_naturais(vlr){

    if (operador === '-' | operador === '%'){

        let menor = vlr[0]
        let maior = vlr[0]
        console.log('------------')
        console.log('Original')
        console.log(vlr)
        console.log('------------')

        if(vlr[1] > maior){

            maior = vlr[1]
    

        }

        if(vlr[1] < menor){

   
            menor = vlr[1]
        }


        vlr[0] = maior
        vlr[1] = menor
        console.log('------------')
        console.log('Modificado')
        console.log(vlr)
        console.log('------------')

        return vlr

    }

}

// Exibe no HTML 
function printa_tabuada(lst){

    // Cria o Elemento HTML em que a sontas serão mostradas.
    containerE1.innerHTML = '<div id="contasaqui"></div>';

  
    document.querySelector('#tabs').innerHTML = ''
    // Elemento HTML (Todos os elementos filhos são relacionados a contas)
    let div = document.querySelector('#contasaqui');

    //  Cria  um input/label para a conta.
    div.innerHTML = '';
    div.innerHTML +=`<label for="resposta" class="contaa"> ${lst[contador][0]}${operador}${lst[contador][1]} = </label>`;
    div.innerHTML +=`<input value="" class="HOHOHO"  min="0" max="99" required placeholder="0" type="number" name="resp" id="resposta">`;

}

//Essa função tem o intuito de servir como uma contagem regressiva.
export function app(tab){

    // Váriavel que delimita a contagem regressiva.
    let contagem = 3;

    // Chama a função 'regresso' a cada 1 segundo.
    let tempo = setInterval(regresso,1000)

    // Exibe no HTML a contagem regressiva
    function regresso(){

        // Tira a mensagem de erro caso tenha sido colocada
        document.querySelector('#error').innerHTML =''

        // Elementos HTML
        cabecalho.textContent = '';
        
        cronometroE1.textContent = contagem;
        botoes.innerHTML = '';

        // Uma vez que a função seja chamada,a var.. contagem diminui em 1
        contagem --

        // Caso a contagem chegue em 1 a var.. 'tempo' é interrompida
        if (contagem < 1 ){

            // para a var... 'tempo'
            clearInterval(tempo);

            // Retorna a função steps
            return steps(tab);

        }

    }
}

// Recebe o valor do input  e faz o devido tratamento de dados;
function recebe_resposta(lst){

    //Elemento HTML do input
    const input =  document.querySelector('#resposta');
    

    // Verifica a tecla pressionada no elemento.
    input.addEventListener('keyup',function (tecla){

        // Verifica se a tecla Enter foi pressionada.
        if (tecla.key === 'Enter'){

            // Com todas as contas finalizadas.
            if(contador === lst.length){

                //Para o cronometro
                stopTimer()

                // Recebe o tempo [00:00:000] 
                const temp = formata_tempo(minutes,seconds,milleseconds)

                //tira o contador do HTML
                botoes.innerHTML =''

                // exibe seções com os [erros] [acertos]
                dasboard()

                // Exibe no HTML aglumas informções.

                containerE1.innerHTML = `<table><colgroup> <col class="tconta"> <col class="twrong"> <col class="tresposta">   </colgroup><thead><tr><th scope="col">Conta</th><th scope="col">u/result</th><th scope="col">resposta</th></tr></thead><tbody class="dados"></tbody></table>`;
                const dados = document.querySelector('.dados')
                contas_erradas.forEach((conta) => { dados.innerHTML += `<tr><td>${conta[0]} ${operador} ${conta[1]}</td> <td>${conta[2]}</td> <td>${conta[0] + conta[1]}</td></tr>`})
                
            }

            // Elemento [Label] do HTML
            const label = document.querySelector('.contaa');

            // Recebe o valor inserido pelo usuário.
            const user_resposta = Number(input.value);

            // Resposta correta da conta
            const resp = lst[contador][0] + lst[contador][1];

            // Verifica se o usuario errou a resposta.
            if ( user_resposta == resp){

                acerto += 1;

            } else{

                erro += 1;
                contas_erradas.push([lst[contador][0],lst[contador][1],user_resposta])
                console.log(contas_erradas)

            }

            // Esta função atribui +1 na váriavel contador.
            fcont();

            // essa função exibe  quantas contas foram comcluidas/total de contas Ex:[14/45]
            contas_concluidas(lst);

            // Atribui ao label a 'nova' conta.
            label.textContent = `${lst[contador][0]}${operador}${lst[contador][1]} = `;
            input.value = ''

        }
        
    })


}

// Exibe no HTML quantas contas foram comcluidas/ total de contas Ex:[14/24]
function contas_concluidas(contas){

    cabecalho.innerHTML = '<h2 id="h2"> Conclua todas as contas !</h2>';
    botoes.innerHTML = `<p id="finished">${contador}/${contas.length}</p>`;

}

//Atribui [+1] na váriavel toda vez que é chamado.
function fcont(){

    return contador +=1;

}


function dasboard(){


    // Exibe 'dasboard' na tela
    const h2 = document.querySelector('#h2');
    h2.textContent = 'Dashboard';

    // Exibe a sseções na tela [ERROS / ACERTOS / ??]
  
    document.querySelector('.cronometro').insertAdjacentHTML('afterend',`<div class="dashboard"><div id="acertos"><h4>Acertos</h4><p>${acerto}</p> </div><div id="erros"><h4>Erros</h4><p>${erro}</p></div><div id="media"><h4>Média p/ Calc</h4><p>${0}</p></div></div>`)

}


// -------- Essa função chama todas as anteriores de forma ordenada ------------

function steps(tabuada){

    //Gera a tabuada

    // Começa o cronometro
    starttimer()

    //Printa a tabuada no HTML
    printa_tabuada(tabuada);

    // Contabiliza as contas já comcluidas
    contas_concluidas(tabuada);

    // Recebe o resultado e faz os devidos processos
    recebe_resposta(tabuada);

}

// -----------------------------------------------------------------------------




