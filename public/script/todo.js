const deleteTodo=(id)=>{
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function(){
        if(xhr.readyState === xhr.DONE){
            if(xhr.status === 200 || xhr.status === 201){
                console.log(xhr.responseText)
                location.href='/todos'
            }else{
                console.error(xhr.responseText)
            }
        }
    }
    
    xhr.open('DELETE', '/todo/delete/'+id)
    xhr.send()
}

const priorityUp=(id, priority)=>{
    if(priority === true) return

    data = { priority: true }

    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function(){
        if(xhr.readyState === xhr.DONE){
            if(xhr.status === 200 || xhr.status === 201){
                console.log(xhr.responseText)
                location.href='/todos'
            }else{
                console.error(xhr.responseText)
            }
        }
    }
    xhr.open('PUT', '/todo/up/'+id)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(data))
}

const priorityDown = (id, priority)=>{
    if(!priority) return

    data = {priority: false}

    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function(){
        if(xhr.readyState === xhr.DONE){
            if(xhr.status === 200 || xhr.status===201){
                console.log(xhr.responseText)
                location.href='/todos'
            }else{
                console.error(error)
            }
        }
    }

    xhr.open('PUT', '/todo/down/'+id)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(data))
}

const editTodo = () =>{
    const id =  document.getElementById('id').value
    const title = document.getElementById('title').value
    const date = document.getElementById('date').value
    const text = document.getElementById('text').value

    const data = {
        id,
        title,
        date,
        text
    }

    const xhr =  new XMLHttpRequest()
    xhr.onreadystatechange=function(){
        if(xhr.readyState === xhr.DONE){
            if(xhr.status === 200 || xhr.status === 201){
                console.log(xhr.responseText)
                location.href='/todos'
            }else{
                console.error(xhr.responseText)
            }
        }
    }

    xhr.open('PUT', '/todo/edit/')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(data))
}