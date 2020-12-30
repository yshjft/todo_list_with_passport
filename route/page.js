const express = require('express')

const router =  express.Router()
const TITLE = 'todo-list'

const tmp = {id:123}

router.get('/', (req, res, next)=>{
    res.render('index', {
        title: TITLE,
        user: null
    })
})

router.get('/join', (req, res, next)=>{
    res.render('join', {
        title: TITLE,
        user: null,
    })
})

router.get('/todos', (req, res, next)=>{
    res.render('todo', {
        title: TITLE,
        user: null,
        todos: null,
        urgent: false
    })
})

router.get('/write', (req, res, next)=>{
    res.render('write', {
        title: TITLE,
        user: null
    })
})

module.exports = router