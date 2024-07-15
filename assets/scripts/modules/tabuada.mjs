
import { formata_tempo, starttimer,stopTimer,minutes,seconds,milleseconds ,select,calcula_diferença} from "./cronometro.mjs";
import { operador,quantity} from "./operação.mjs";
import { resposta_correta } from "./selectab.mjs";
import { dicas } from "./hints.mjs";
import { add_value_db,acessa_dados } from "./DB.mjs";

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

// botão com as operações
let operationButton = document.querySelector('#operação')

// Cronometro
const cronometroE1 = document.querySelector('.time');
let soma = 0
//  array com com os valroes da tabuada estática
let inicio = 0
let fim = 0
let media = 0

// variavel acomuladora
export let contador = 0;

let acerto = 0;
let erro = 0;

const logs = []

// contas erradas serão armazenadas aqui.
const contas_erradas = []

//Gera a tabuada.
export function gerar_tabuada(){

    // Lista com os valores de todas as contas geradas
    const valores = [];

    // laço de repetição. Intuito é repetir x vezes para criar x contas.
    for (let c = 1; c<=quantity;c++){

        // Gera números aléatorios de 1 até 9.
        let n1 = Math.floor((Math.random() * 9) + 1);
        let n2 = Math.floor((Math.random() * 9) + 1);

        // Adiciona os números gerados em uma lista [realocando sua posição].
        let vlr = [n1,n2];

        if (operador === '-' | operador === '%'){

            vlr = formata_para_naturais([n1,n2]);

            if (operador === '%' & vlr[1] % vlr[2] != 0){

                vlr = formata_para_div_inteiro(vlr)

            }

        }

        // Adiciona os números gerados em uma lista externa.
        valores.push(vlr);
    
    }
    
    // retorna uma array com todas as contas geradas.

    return valores;

}

// Formata os números para uma divisão inteira
function formata_para_div_inteiro(numbers){

    while(numbers[0] % numbers[1] !== 0 | numbers[0] / numbers[1] > 9 | numbers[1] === 1){

        // Gera números aléatorios de 1 até 9.
        numbers[0] = Math.floor((Math.random() * 90) + 10);
        numbers[1] = Math.floor((Math.random() * 9) + 1);

        formata_para_naturais(numbers)

    }

    return numbers
}

// Realoca a posição dos  números para que seus resultados sejam sempre naturais[N]
function formata_para_naturais(vlr){

    if (operador === '-' | operador === '%'){

        let menor = vlr[0]
        let maior = vlr[0]

        if(vlr[1] > maior){

            maior = vlr[1]
    

        }

        if(vlr[1] < menor){

   
            menor = vlr[1]
        }


        vlr[0] = maior
        vlr[1] = menor

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

            fim = select()
            
            // Com todas as contas finalizadas.
            if(contador === lst.length){

                //Para o cronometro
                stopTimer()
                dicas(formata_tempo(minutes,seconds,milleseconds))

                media =  Math.ceil(soma / lst.length)
                //tira o contador do HTML
                botoes.innerHTML =''

                // exibe seções com os [erros] [acertos]
                dasboard()

                // Exibe no HTML aglumas informções.

                containerE1.innerHTML = `<table><colgroup> <col class="tconta"> <col class="twrong"> <col class="tresposta">   </colgroup><thead><tr><th scope="col">Conta</th><th scope="col"><abbr title="Resposta do Usuário">u/result</abbr></th><th scope="col">resposta</th></tr></thead><tbody class="dados"></tbody></table>`;
                const dados = document.querySelector('.dados')
                contas_erradas.forEach((conta) => {dados.innerHTML += `<tr><td>${conta[0]} ${operador} ${conta[1]}</td> <td>${conta[2]}</td> <td>${resposta_correta(conta[0],conta[1])}</td></tr>`})
                acessa_dados()
               
            }

            // Elemento [Label] do HTML
            const label = document.querySelector('.contaa');

            // Recebe o valor inserido pelo usuário.
            const user_resposta = Number(input.value);

            // Resposta correta da conta
            const resp = resposta_correta(lst[contador][0],lst[contador][1])

            // Verifica se o usuario errou a resposta.
            if ( user_resposta == resp){

                acerto += 1;

            } else{

                erro += 1;
                contas_erradas.push([lst[contador][0],lst[contador][1],user_resposta])
                
            }

            // Esta função atribui +1 na váriavel contador.
            fcont();

            // essa função exibe  quantas contas foram comcluidas/total de contas Ex:[14/45]
            contas_concluidas(lst);

            // Atribui ao label a 'nova' conta.
            label.textContent = `${lst[contador][0]}${operador}${lst[contador][1]} = `;
            let obj = {
                
                conta:[lst[contador][0],lst[contador][1]],
                resposta_usuario:user_resposta,
                resposta_correta:resp
                
            }
            logs.push(obj)

            input.value = ''

            soma += calcula_diferença(inicio,fim)
            inicio = fim

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

    const obj = {

        acertos:acerto,
        erros:erro,
        tempo: formata_tempo(minutes,seconds,milleseconds),
        operação: operationButton.textContent,
        data: new Date().toLocaleDateString('PT-BR'),
        contas:logs

    }

    add_value_db(obj)

    // Exibe 'dasboard' na tela
    const h2 = document.querySelector('#h2');
    h2.textContent = 'Dashboard';

    // Exibe a sseções na tela [ERROS / ACERTOS / ??]

    document.querySelector('.cronometro').insertAdjacentHTML('afterend',`<div class="dashboard"><div id="acertos"><h4>Acertos</h4><p>${acerto}</p> </div><div id="erros"><h4>Erros</h4><p>${erro}</p></div><div id="media"><h4><abbr title="Tempo médio que o usuário levou para concluir as questões">Média p/ Cal</abbr></h4><p>${`${media}Seg`}</p></div></div>`)

    footer('2')


    
}

// -------- Essa função chama todas as anteriores de forma ordenada ------------

function steps(tabuada){

    // Começa o cronometro
    starttimer()

    // marca o tempo inicial
    inicio = select()

    //Printa a tabuada no HTML
    printa_tabuada(tabuada);

    // Contabiliza as contas já comcluidas
    contas_concluidas(tabuada);

    // Recebe o resultado e faz os devidos processos
    recebe_resposta(tabuada);

    footer('45')

   

}


// -----------------------------------------------------------------------------


function footer(px){

    const footerE1 = document.querySelector('footer')

    footerE1.style.cssText = `margin-top:${px}vh;`


}

