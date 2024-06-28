
// --------- Váriaveis ---------------------------------------------------------

//  Elemento HTML [CRONOMETRO]
const container= document.querySelector('.cronometro')
const HTMLcronometro = document.querySelector('.time')

let interval
export let minutes = 0
export let seconds = 0
export let milleseconds = 0
let ispaused = false


// -----------------------------------------------------------------------------

// --------------------------  F U N Ç Ô E S  ----------------------------------

// Inicia a contagem do contronometro.
export function starttimer(){

    container.insertAdjacentHTML('afterbegin','<i class="ph ph-eye"></i>')

    document.querySelector('.ph').addEventListener('click',hide_seek)

    // Essa arrow function é chamada a  cada 10 Millisegundos.
    interval = setInterval(() => {

        // O cronometro só será executado caso a  var... 'ispaused' for false
        if (!ispaused){

            milleseconds += 10

            // 1000 millesegundos = 1 segundo
            if(milleseconds === 1000){

                seconds ++;
                milleseconds = 0;

            }

            //  60 segundos = 1 minuto
            if(seconds === 60){

                minutes ++;
                seconds = 0;

            }

        //Adiciona no HTML os valores 'cronometrados'

        HTMLcronometro.textContent = formata_tempo(minutes,seconds,milleseconds)

        }

    },10)

}

// Exibe os números no HTML de forma mais agradável.
export function formata_tempo(min,seg,mill){

    if (min < 10){

        min = `0${min}`

    }

        
    if (seg < 10){

        seg = `0${seg}`

    }

        
    if (mill < 100){

        mill = `0${mill}`.padStart(3,"0");

    }


    return `${min}:${seg}:${mill}`

}
// Converte o timer em segundos
export function select(){

    let fim = formata_tempo(minutes,seconds,milleseconds)

    const [minutos, segundos, millesegundos] = fim.split(':');
    let MinutosEmSegundos =  parseInt(minutos * 60)
    let SegundosEmSegundos = parseInt(segundos)
    let MillesegundosEmSegundos = parseFloat(millesegundos) / 1000
    return MinutosEmSegundos + SegundosEmSegundos + MillesegundosEmSegundos

}

export function calcula_diferença(start,end){

    return  end - start

}
// Para o Cronometro.
export function stopTimer(){

    ispaused = true

}

// Reseta o cronometro
export function resetTimer(){

    clearInterval(interval);
    minutes = 0
    seconds = 0
    milleseconds = 0

    HTMLcronometro.textContent  = formata_tempo(minutes,seconds,milleseconds)

}


function hide_seek(){

    const olhos = document.querySelector('.ph')

    if(olhos.getAttribute('view') === ''){

        olhos.setAttribute('view','enabled')

    } else{

        if(olhos.getAttribute('view') === 'enabled'){

            olhos.setAttribute('class','ph ph-eye-slash')
            HTMLcronometro.style.cssText = 'filter:blur(17px);'
            olhos.setAttribute('view','disabled')

        } else {

            olhos.setAttribute('class','ph ph-eye')
            HTMLcronometro.style.cssText = 'filter:blur(0px);'
            olhos.setAttribute('view','enabled')

        }

    }

}
