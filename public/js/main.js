const deleteBtn = document.querySelectorAll('.del')
const attractionItem = document.querySelectorAll('span.not')
const attractionComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteAttraction)
})

Array.from(attractionItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(attractionComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteAttraction(){
    const attractionId = this.parentNode.dataset.id
    try{
        const response = await fetch('attractions/deleteAttraction', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'attractionIdFromJSFile': attractionId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const attractionId = this.parentNode.dataset.id
    try{
        const response = await fetch('attractions/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'attractionIdFromJSFile': attractionId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const attractionId = this.parentNode.dataset.id
    try{
        const response = await fetch('attractions/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'attractionIdFromJSFile': attractionId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}