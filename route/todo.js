const express = require('express')
const router =  express.Router()
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')
const {Todo} =  require('../models')

router.post('/write', isLoggedIn, async(req, res, next)=>{
    const {title, date, text} =  req.body
    await Todo.create({
        title,
        date: date,
        text: text,
        userId: req.user.id
    })
    res.redirect('/todos')
})

router.put('/up/:id', isLoggedIn, async(req, res, next)=>{
    const {priority} = req.body
    try{
        await Todo.update({
            priority : priority
        }, {
            where: {id:req.params.id}
        })
        res.status(201).send('success')
    }catch(error){
        console.error(error)
        next(error)
    }
})

router.put('/down/:id', isLoggedIn, async(req, res, next)=>{
    const {priority} = req.body
    try {
        await Todo.update({
            priority: priority
        }, {
            where: {id:req.params.id}
        })
        res.status(200).send('success')
    }catch(error){
        console.error(error)
        next(error)
    }
})

router.put('/edit', isLoggedIn, async(req, res, next)=>{
    console.log('ha ha ha ha ha ha ha ha ha ha ha ha ha ha ha ha ha ha ha ha ha ha ha ha ')
    const {id, title, date, text} = req.body
    try {
        await Todo.update({
            title: title,
            date: date,
            text: text,
        }, {
            where: {id: id}
        })
        res.redirect('/todos')
    }catch(error){
        console.error(error)
        next(error)
    }
})

router.delete('/delete/:id', isLoggedIn, async(req, res, next)=>{
    try{
        await Todo.destroy({where:{id:req.params.id}})
        return res.status(201).send('delete complete')
    }catch(error){
        console.error(error)
        next(error)
    }  
})

module.exports=router