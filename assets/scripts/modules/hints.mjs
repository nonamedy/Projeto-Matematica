import { tabuadas } from "./operação.mjs";
import { operador } from "./operação.mjs";


export function dicas(final_timer){

    const [minutos, segundos, millesegundos] = final_timer.split(':');
  
    switch(operador){

        case '%':

            if(minutos >= 3){

                create_section()

            }
        
        break

    }

    

    return null
}

function create_section(){

    const container = document.querySelector('.container-botoes')

    const element = document.createElement('div')
    element.className = 'hint'

    container.insertAdjacentElement('afterend',element)
    let title = document.createElement('h4')
    let linha = document.createElement('hr')

    let p1 = gera_paragrafo(tabuadas.divisão.ajuda.hint1)
    let p2 = gera_paragrafo(tabuadas.divisão.ajuda.hint2)

    title.textContent = 'Dica!'

    element.insertAdjacentElement('afterbegin',title)
    element.insertAdjacentElement('beforeend',linha)
    element.insertAdjacentElement('beforeend',p1)
    element.insertAdjacentElement('beforeend',p2)


}

function gera_paragrafo(txt){

    let paragrafo = document.createElement('p')
    paragrafo.textContent = txt
    return paragrafo

}