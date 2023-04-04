let validador = {
    handleSubmit: (el)=>{
        el.preventDefault()
        let send = true;

        let inputs = form.querySelectorAll('input')     
       
        validador.clear()
       
        for(let i = 0; i<inputs.length;i++){
            let input = inputs[i];
            let check = validador.checkInput(input);
            if (check !== true){
                send = false;
                validador.msgError(input,check)
            }
        }
        if(send) {
            form.submit();
        }
    },
    checkInput: (input)=>{
        let regras = input.getAttribute('data-rules')
       
        if(regras !== null){
            regras = regras.split('|')
            for(let k in regras ){
                let rDetalhes = regras[k].split('=')
                switch(rDetalhes[0]){
                    case 'required' :
                        if(input.value == ''){
                            return 'Campo não pode ser vazio.'
                        } 
                    break;
                    case 'min':
                        if(input.value.length < rDetalhes[1] ){
                            return `Campo não poder menos de ${rDetalhes[1]} caracteres` 
                        } 
                    break;
                    case 'email':
                        if(input.value == '' ){
                            return 'Campo não pode ser vazio.' 
                        } 
                        break
                    case 'email':
                            if(input.value !='') {
                                let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                if(!regex.test(input.value.toLowerCase())) {
                                    return 'E-mail digitado não é válido!';
                                }
                            }
                    break;
                   }

              
            }
            
        }
        return true
    },
    msgError: (input,error)=>{
        input.style.borderColor = '#f00'

        let divError = document.createElement('div')
        divError.classList.add('error');
        divError.innerHTML = error
        
        input.parentElement.insertBefore(divError,input.ElementSibling)
    },
    clear : ()=>{
        let inputs = form.querySelectorAll('input');
        for( let i=0; i <inputs.length;i++){
            inputs[i].style =" "
        }

        let errorElements = document.querySelectorAll('.error')
        for(let i=0 ;i<errorElements.length;i++){
            errorElements[i].remove()
        }
    }
}


let form = document.querySelector('.validador');
form.addEventListener('submit',validador.handleSubmit);
