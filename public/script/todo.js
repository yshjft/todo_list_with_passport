document.querySelectorAll('#edit').forEach((editBtn)=>{
    editBtn.addEventListener('click', (e)=>{
        let address="/todo/"+e.target.name
        location.href = address
    })
})

document.querySelectorAll('#delete').forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', (e)=>{
        let id = e.target.name

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
    })
})

document.querySelectorAll('#priorityUp').forEach((priorityUpBtn)=>{
    priorityUpBtn.addEventListener('click', (e)=>{
        const idWitUrgent = e.target.name.split(' ')
        if(!Boolean(idWitUrgent[1]) === true) return

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
        xhr.open('PUT', '/todo/up/'+idWitUrgent[0])
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
    })
})


document.querySelectorAll('#priorityDown').forEach((priorityDownBtn)=>{
    priorityDownBtn.addEventListener('click', (e)=>{
        const idWitUrgent = e.target.name.split(' ')
        if(idWitUrgent[1] === 'false') return

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

        xhr.open('PUT', '/todo/down/'+idWitUrgent[0])
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
    })
})

document.querySelectorAll('#editTodo').forEach((editTodo)=>{
    editTodo.addEventListener('click', (e)=>{
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
    })
})