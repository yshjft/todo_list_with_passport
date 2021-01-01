const express = require('express')
const router =  express.Router()
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')
const {Todo} = require('../models')
const TITLE = 'todo-list'

const tmp = {id:123}

router.get('/', (req, res, next)=>{
    res.render('index', {
        title: TITLE,
        user: req.user,
        loginError: req.flash('loginError')
    })
})

router.get('/join', isNotLoggedIn, (req, res, next)=>{
    res.render('join', {
        title: TITLE,
        warning: req.flash('alreadyUsed'),
        user: req.user,
    })
})

router.get('/todos', isLoggedIn, async (req, res, next)=>{
    const todoList =  await Todo.findAll({where: {userId: req.user.id}})
    res.render('todo', {
        title: TITLE,
        user: req.user,
        todos: todoList,
        urgent: false
    })
})

router.get('/write', isLoggedIn, (req, res, next)=>{
    res.render('write', {
        title: TITLE,
        user: req.user
    })
})

module.exports = router