const express =  require('express')
const bcrypt = require('bcryptjs')
const {User} =  require('../models')
const router = express.Router()


router.post('/join', async (req,res,next)=>{
    const {email, password, nick} =  req.body

    try{
        const exUser =  await User.findOne({where:{email}})
        if(exUser){
            req.flash('alreadyUsed', 'already used email')
            return res.redirect('/join')
        }else{
            const hash = await bcrypt.hash(password, 14)
            await User.create({
                email,
                nick,
                password: hash
            })
            return res.redirect('/')
        }
    }catch(error){
        return next(error)
    }
})

router.post('/login', async(req, res, next)=>{
    
})

module.exports = router