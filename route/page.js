const express = require('express')

const router =  express.Router()
const TITLE = 'todo-list'

router.get('/', (req, res, next)=>{
    res.render('index', {
        title: TITLE,
        user: {id: 123}
    })
})

router.get('/join', (req, res, next)=>{
    res.render('join', {
        title: TITLE,
        user: null,
    })
})

module.exports = router