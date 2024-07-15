
const father = document.querySelector('main')

function create_database(name,version){

    return new Promise((resolve,reject) => {

        const database = indexedDB.open(name,version)
    
        database.onsuccess =  () => resolve(database.result)
        database.onerror = () =>  reject(database.error)

        database.onupgradeneeded = (event) => {

            const data = database.result

            switch(event.newVersion){

                case 1:

                    create_ObjectStore(data,'Registros')
      
                break

            }

        }

    })

}

function create_ObjectStore(db,name){

    if(!db.objectStoreNames.contains('Registros')){
            
        return db.createObjectStore(name,{autoIncrement:true,keyPath:'id'})

    }
    
}


function transaction(db,ObjectName,mode){

    return new Promise((resolve,reject) => {

        const TransactionRequest = db.transaction(ObjectName,mode)

        TransactionRequest.oncomplete = () => resolve(TransactionRequest);
        TransactionRequest.onerror = () => reject(TransactionRequest.error);
    
       
    })
 

}

let database = create_database('database',1)

export function add_value_db(obj){

    console.log('activated')

    database.then((db) => {

        let a = db.transaction('Registros','readwrite')
        let b = a.objectStore('Registros')
        b.add(obj)

    })


}

export function acessa_dados(){
        console.log('function started')
        database.then((db) => {
    
        let requisition = db.transaction('Registros','readonly').objectStore('Registros')
        let request = requisition.openCursor()
    
        let section = document.createElement('section')
        section.className = 'history'
        father.insertAdjacentElement('beforeend',section)
        

        let components = document.createElement('div')
        components.className = 'components'


        let h3 = document.createElement('h3')
        h3.id= 'comps'
        h3.textContent = 'Resultados anteriores'

        section.insertAdjacentElement('afterbegin',h3)
        section.insertAdjacentElement('beforeend',components)

        request.onsuccess = (evento) => {

            const cursor = evento.target.result

            console.log(cursor)

            if(cursor){
                
           
                let value = cursor.value

                new_component(value,components)

                cursor.continue()


            }else {

                console.log('Não há mais registros')

            }

        }

        request.onerror= (error) => {console.log('deu ruim' + error)}

    }
    )

}

function new_component(object,father){

    let container = document.createElement('div')
    let title = document.createElement('h4')
    title.className = 'tab_title'
    let time_info = document.createElement('p')
    let operation = document.createElement('p')
    let circle = document.createElement('i')
    circle.className = 'ph ph-fill ph-circle'

    let content_container = document.createElement('div')
    let wrong = document.createElement('p')
    let correct = document.createElement('p')
    container.id = object.key
    container.className = 'history_container'
    wrong.id = 'erro'
    correct.id = 'acerto'
    operation.id = 'tag'

    title.textContent = object.data
    time_info.textContent = object.tempo
    container.id = `i${object.id}`
    operation.textContent = object.operação
    

    wrong.textContent = `Erros: ${object.erros}`
    correct.textContent = `Acertos: ${object.acertos}`



    container.insertAdjacentElement('afterbegin',time_info)
    container.insertAdjacentElement('afterbegin',title)

    container.insertAdjacentElement('beforeend',content_container)

    content_container.insertAdjacentElement('beforeend',correct)
    content_container.insertAdjacentElement('beforeend',wrong)

    operation.insertAdjacentElement('afterbegin',circle)
    container.insertAdjacentElement('beforeend',operation)
    
    father.insertAdjacentElement('beforeend',container)

    tag_color(operation,object)

    
}

function tag_color(element,operation){


    element = element.children[0]
    console.log(element)
   

    switch(operation.operação){

        case 'Adição':

            element.style.color = 'red'
            break

        case 'Subtração':
            element.style.color = 'blue'
            break

        case 'Divisão':
           element.style.color = 'yellow'
           break
     
        
        case 'Multiplicação':
            element.style.color = 'green'
            break

    }

}

