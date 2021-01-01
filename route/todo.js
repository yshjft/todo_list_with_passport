const express = require('express')
const router =  express.Router()
const {Todo} =  require('../models')

router.post('/write', async(req, res, next)=>{
    const {title, date, text} =  req.body
    await Todo.create({
        title,
        date: date,
        text: text,
        userId: req.user.id
    })
    res.redirect('/todos')
})

module.exports=router