
export const buttonE1 = document.querySelector('#operação')
export let operador = '+'

export const tabuadas = {

    adição:{

        tab_add:[[9,9],[6,5],[7,9],[2,8],[8,9],[4,3],[9,6],[7,4],[8,7],[5,6],[9,5],[7,6],[8,3],[9,3],[7,2],[4,9],[3,4],[7,5],[5,4],[2,9],[3,2],[5,5],[8,6],[3,7],[2,4],[6,8],[4,5],[8,5],[3,4],[9,7],[4,3],[7,8],[6,6],[9,8],[7,7],[3,9],[6,7],[5,4],[6,9],[3,3],[5,8],[5,9],[2,3],[8,2],[9,4],[4,7],[8,8],[4,2],[9,2],[8,4],[5,7],[2,7],[4,8],[7,3]],
        quantidade:54,
        ranking:{
            
            otimo:'Menos de 1 minuto',
            bom:'De 1 a 2 minutos',
            mais_ou_menos:'De 2 a 3 minutos',
            fraco:'De 3 a 4 minutos',
            ta_frio:'Acima de 4 minutos',
        },

    },
    subtração:{

        tab_sub:[[19,9],[11,6],[16,7],[10,2],[17,8],[7,4],[15,9],[11,7],[15,8],[11,5],[14,9],[13,7],[11,8],[12,9],[9,7],[13,4],[7,3],[12,7],[9,5],[11,2],[5,3],[10,5],[14,8],[10,3],[6,2],[14,6],[9,4],[13,8],[7,3],[16,9],[7,4],[15,7],[12,6],[17,9],[14,7],[12,3],[13,6],[9,5],[15,6],[6,3],[13,5],[14,5],[5,2],[10,8],[13,9],[11,4],[16,8],[6,4],[11,9],[12,8],[12,5],[9,2],[12,4],[10,7]],
        quantidade:54,
        ranking:{

            otimo:'Menos de 1 minuto',
            bom:'De 1 a 2 minutos',
            mais_ou_menos:'De 2 a 3 minutos',
            fraco:'De 3 a 4 minutos',
            ta_frio:'Acima de 4 minutos',
        },
    },
   
    divisão:{

        tab_div:[[20,5],[15,5],[35,5],[27,9],[48,6],[18,6],[63,7],[9,3],[42,6],[21,3],[48,8],[36,4],[21,7],[25,5],[36,6],[24,3],[28,7],[54,6],[56,8],[12,3],[48,8],[45,5],[72,8],[30,6],[24,6],[40,5],[24,4],[45,9],[32,4],[15,3],[42,7],[28,4],[27,3],[54,9],[56,7],[30,6],[64,8],[81,9],[12,4],[36,9],[18,3],[32,8],[72,9],[35,7],[16,4],[24,8],[49,7],[20,4],[63,9]],
        quantodade:49,
        ranking:{

            otimo:'Menos de 1 minuto',
            bom:'De 1 a 2 minutos',
            mais_ou_menos:'De 2 a 3 minutos',
            fraco:'De 3 a 4 minutos',
            ta_frio:'Acima de 4 minutos',
        },
        ajuda:{

            hint1:'Toda divisão exata é uma multiplicação feita “ao contrário”. Por exemplo, sabemos que 3x10=30. Então, se dividirmos 30 por 3, encontraremos 10. Se dividirmos 30 por 10,encontraremos 3.',
            hint2:'Deu para perceber que é necessário conhecer muito bem a tabela de multiplicação, já que a divisão nada mais é que a operação inversa da multiplicação. Assim como ocorre nas outras operações, você também precisa memorizar os resultados para que faça cálculos com maior facilidade e velocidade.',

        },


    },

    multiplicação:{

        tab_mult:[[3,5],[5,7],[3,6],[7,9],[3,7],[5,5],[6,6],[4,7],[4,8],[4,4],[6,9],[5,9],[8,9],[5,6],[5,8],[4,6],[6,7],[6,8],[3,9],[7,8],[8,8],[3,3],[9,9],[3,4],[4,9],[3,8],[7,7],[4,5]],
        quantidade:28,
        ranking:{
            
            otimo:'Menos de 30 segundos',
            bom:'De 30 segundos a 1 minuto',
            mais_ou_menos:'De 1 a 1:30 minutos',
            fraco:'De 1:30 a 2 minutos',
            ta_frio:'Acima de 2 minutos',
        }
    },

    motivation:{

        min4:'“Tá frito” não é tão ruim assim, a menos que você precise fazer uma prova de matemática dentro de 30 minutos. Provavelmente não é esse o caso, você tem muito tempo para treinar e dominar a matemática.',
        mt2:'O objetivo é chegar ao ótimo. Qualquer pessoa, mesmo começando na escala “tá frito”, podechegar ao ótimo se repetir o processo várias vezes. Você notará que a cada repetição, o seu tempo será menor. Isso é realmente necessário, pois quem demora a fazer essas contas vai encontrar imensas dificuldades para fazer cálculos mais complexos.',
        mt3:'Lembre-se, Melhorar suas habilidades nas operações básicas dificultam a chance de você ficar enroscado em operações mais complexas, facilite sua vida, Treine!',
        mt4:'Tente sempre que possível fazer as operações, não leva nem 10 minutos do seu dia! Persistência é a chave para o sucesso.',
    },

}

export let quantity = tabuadas.adição.quantidade
export let tabuada_estatica = tabuadas.adição.tab_add

export function chose(){
    
    let valor = buttonE1.textContent
    

    switch(valor){

        case 'Adição':
            
            buttonE1.textContent = 'Subtração'
            operador = '-'
            tabuada_estatica = tabuadas.subtração.tab_sub
            quantity = tabuadas.subtração.quantidade
              
        break
        
        case 'Subtração':
            buttonE1.textContent = 'Divisão'
            operador = '%'
            tabuada_estatica = tabuadas.divisão.tab_div
            quantity = tabuadas.divisão.quantodade
            
        break

        case 'Divisão':
            buttonE1.textContent = 'Multiplicação'
            operador = 'x'
            tabuada_estatica = tabuadas.multiplicação.tab_mult
            quantity = tabuadas.multiplicação.quantidade
        break

        case 'Multiplicação':
            buttonE1.textContent = 'Adição'
            operador = '+'
            tabuada_estatica = tabuadas.adição.tab_add
            quantity = tabuadas.adição.quantidade
        break

        default:
            operador = '+'
            quantity  = tabuadas.adição.quantidade

    }

}


