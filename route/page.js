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
    const todoList =  await Todo.findAll({
        order: [['priority', 'DESC'], ['date', 'ASC']],
        where: {userId: req.user.id}
    })
    res.render('todo', {
        title: TITLE,
        user: req.user,
        todos: todoList,
    })
})

router.get('/todo/:id', isLoggedIn, async(req, res, next)=>{
    try{
        const todo = await Todo.findOne({where: {id: req.params.id}})
        res.render('edit', {
            title: TITLE,
            user: req.user,
            todo: todo,
        })
    }catch(error){
        console.error(error)
        return next(error)
    }
})

router.get('/write', isLoggedIn, (req, res, next)=>{
    res.render('write', {
        title: TITLE,
        user: req.user
    })
})

module.exports = router