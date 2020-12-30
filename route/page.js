const express = require('express')

const router =  express.Router()
const TITLE = 'todo-list'

const tmp = {id:123}

router.get('/', (req, res, next)=>{
    res.render('index', {
        title: TITLE,
        user: tmp
    })
})

router.get('/join', (req, res, next)=>{
    res.render('join', {
        title: TITLE,
        user: tmp,
    })
})

router.get('/todos', (req, res, next)=>{
    res.render('todo', {
        title: TITLE,
        user: {id:123},
        todos: tmp
    })
})

module.exports = router