import { app,button,gerar_tabuada,contador} from "./tabuada.mjs";
import { tabuada_estatica,buttonE1} from "./operação.mjs";


//Tabuada Estática [Elemento HTML]
export const static_tab = document.querySelector('#tab_estatica') 

//Tabuada Aleatôria [Elemento HTML]
export const randow_tab = document.querySelector('#tab_aleatoria') 

// Container com os card das tabuadas
const tab_container =  document.querySelector('#error')



//resultado correto
let resultado = 0;

// tabuada selecionada [array]
let selected_tab = []

static_tab.setAttribute('cheked','disabled')
randow_tab.setAttribute('cheked','disabled')

export function verify(){


    if (static_tab.getAttribute('cheked') == 'disabled' & randow_tab.getAttribute('cheked') == 'disabled' ){

        tab_container.innerHTML = `<p> X Porfavor selecione uma das opções abaixo</p>`

    } else {

        if (static_tab.getAttribute('cheked') == 'enabled'){

            selected_tab = tabuada_estatica
           


        } else{

            selected_tab = gerar_tabuada()
        
        }

       
        app(selected_tab)

    }

}

export function resposta_correta(n1,n2){

    let valor = buttonE1.textContent

    switch(valor){

        case 'Adição':
            return resultado = n1 + n2
       

        case 'Subtração':
            return resultado = n1 - n2
      

        case 'Divisão':
           return resultado = n1 / n2
     
        
        case 'Multiplicação':
            return resultado =  n1 * n2

}}

export function select(tab){


    if (tab.getAttribute('cheked') === 'disabled'){

        if(tab === static_tab){

            if (randow_tab.getAttribute('cheked') === 'enabled'){

                randow_tab.setAttribute('cheked','disabled')

            }

        }

        if(tab === randow_tab){

            if (static_tab.getAttribute('cheked') === 'enabled'){

                static_tab.setAttribute('cheked','disabled')

            }

        }



        tab.setAttribute('cheked','enabled')

    } else {

        tab.setAttribute('cheked','disabled')

    }

}