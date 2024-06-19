
export const buttonE1 = document.querySelector('#operação')

export function chose(){
    
    let valor = buttonE1.textContent

    switch(valor){

        case 'Adição':
            
            buttonE1.textContent = 'Subtração'
            
        break
        
        case 'Subtração':
            buttonE1.textContent = 'Divisão'
        break

        case 'Divisão':
            buttonE1.textContent = 'Adição'
        break

        default:
            console.log('Adição')


    }


}

