const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path  = require('path')
const morgan = require('morgan')
const flash = require('connect-flash')
const passport = require('passport')
require('dotenv').config()

const pageRouter = require('./route/page')
const authRouter = require('./route/auth')
const todoRouter = require('./route/todo')
const { sequelize } = require('./models')
const passportConfig =require('./passport')

const app = express()
sequelize.sync()
passportConfig(passport)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 8080)

// 배포 환경인지 개발 환경인지에 따라 다른 모드 적용
if(process.env.NODE_ENV === 'production'){
    app.use(morgan('combined')) //더 많은 사용자 정보를 로그로 남김
}else{
    app.use(morgan('dev'))
}
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}))
app.use(flash())
app.use(passport.initialize()) // req 객체에 passport 설정을 심는다
app.use(passport.session()) // req.session 객체에 passport 정보를 저장

app.use('/', pageRouter)
app.use('/auth', authRouter)
app.use('/todo', todoRouter)

app.use((req, res, next)=>{
    const err = new Error()
    err.status = 404
    next(err)
})

app.use((err, req, res, next)=>{
    res.locals.message = err.message
    res.locals.error =  req.app.get('env') === 'development' ? err: {}
    res.status(err.status || 500)
    res.render('error')
})

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중')
})