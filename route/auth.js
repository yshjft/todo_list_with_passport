const express =  require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const {User} =  require('../models')
const router = express.Router()
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')


router.post('/join', isNotLoggedIn, async (req,res,next)=>{
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

router.post('/login', isNotLoggedIn, async(req, res, next)=>{
    // passport.authenticate 미들웨어가 로컬 로그인 전략을 실행한다
    passport.authenticate('local',(authError, user, info)=>{
        if(authError){
            console.error(authError)
            return next(authError)
        }
        if(!user){
            req.flash('loginError', info.message)
            return res.redirect('/')
        }
        return req.logIn(user, (loginError)=>{
            if(loginError){
                console.error(loginError)
                return next(loginError)
            }
            return res.redirect('/')
        })
    })(req, res, next)
})

router.get('/logout', isLoggedIn, (req, res, next)=>{
    req.logout()
    req.session.destroy()
    res.redirect('/')
})

module.exports = router