import { tabuadas } from "./operação.mjs";


const container = document.querySelector('.container-botoes')

export function dicas(final_timer){

    const [minutos, segundos, millesegundos] = final_timer.split(':');
    
    analisa_tempo(minutos)

    return null
}

function create_section(){

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
    paragrafo.className = 'hintxt'
    return paragrafo

}

function mensagem(titulo,mensagem,opc){

    const element = document.createElement('div')

    element.className = 'msg'

    container.insertAdjacentElement('afterend',element)

    let title = document.createElement('h4')
    let paragrafo = document.createElement('p')

    title.textContent = titulo
    paragrafo.textContent = mensagem

    element.insertAdjacentElement('afterbegin',title)
    element.insertAdjacentElement('beforeend',paragrafo)
    
    if(opc != ''){

        let paragrafo_adicional = paragrafo = document.createElement('p')
        paragrafo_adicional.textContent = opc
        element.insertAdjacentElement('beforeend',paragrafo_adicional)

    }

}

function analisa_tempo(minutos){

    if(minutos <=0){

        mensagem('Parabens!','Você terminou todas as questões em menos de 1 minuto.','Isso mostra que você no seu melhor, mas não se esqueça de voltar aqui e ver se ainda consegue fazer neste mesmo tempo!')

    }

    if(minutos === 1 ){

        mensagem('Muito Bem!',tabuadas.motivation.mt4)

    }

    if(minutos >= 2 & minutos  <=3 ){

        mensagem('Mais ou menos!',tabuadas.motivation.mt3)

    }

    if(minutos >= 4){

        mensagem('Tá Frio',tabuadas.motivation.min4,tabuadas.motivation.mt2)

    }

}