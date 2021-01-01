const local = require('./localStrategy')
const {User} = require('../models')

module.exports = (passport) => {
    // req.session 객체에 어떤 데이터를 저장할지 선택
    passport.serializeUser((user, done)=>{
        // done(에러 발생시 사용, req.session 객체에 저장할 데이터)
        done(null, user.id)
    })

    // 매 요청시 실행, passport.session() 미들웨어가 호출, 
    passport.deserializeUser((id, done)=>{
        User.findOne({where: {id}})
            .then(user => done(null, user)) // 정보를 req.user에 저장
            .catch(err => done(err))
    })

    local(passport)
}