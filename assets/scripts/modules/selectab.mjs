import { app,button,gerar_tabuada} from "./tabuada.mjs";
import { tabuada_estatica } from "./operação.mjs";


//Tabuada Estática
export const static_tab = document.querySelector('#tab_estatica') 

//Tabuada Aleatôria
export const randow_tab = document.querySelector('#tab_aleatoria') 

// Container com os card das tabuadas
const tab_container =  document.querySelector('#error')

static_tab.setAttribute('cheked','disabled')
randow_tab.setAttribute('cheked','disabled')

export function verify(){


    if (static_tab.getAttribute('cheked') == 'disabled' & randow_tab.getAttribute('cheked') == 'disabled' ){

        tab_container.innerHTML = `<p> X Porfavor selecione uma das opções abaixo</p>`

    } else {

        if (static_tab.getAttribute('cheked') == 'enabled'){

            
            app(tabuada_estatica)

        } else{

            
            app(gerar_tabuada())

        }

    }

}

export function select(tab){


    if (tab.getAttribute('cheked') === 'disabled'){

        if(tab === static_tab){

            if (randow_tab.getAttribute('cheked') == 'enabled'){

                randow_tab.setAttribute('cheked','disabled')

            }

        }

        if(tab === randow_tab){

            if (static_tab.getAttribute('cheked') == 'enabled'){

                static_tab.setAttribute('cheked','disabled')

            }

        }



        tab.setAttribute('cheked','enabled')

    } else {

        tab.setAttribute('cheked','disabled')

    }

}