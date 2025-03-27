import authRouter from './authRouter'
import manageRouteMap from './manageRouter'
import userRouter from './userRouter'
import homeRouter from './homeRouter'
import chatrouter from './chatRouter'
import commonRouter from './commonRouter'
import LandingPageRouter from './subscribe.js'
import notificationRouter from './notificationRouter'
import projectRouter from './projectRouter'
import socketRoutes from './socket'
import artificialIntelligenceRouter from './artificialIntelligenceRouter'
import articleRouter from './articleRouter'
import profileRouter from './profileRouter'
import talentRouter from './talentRouter'

function route(app, io) {
    socketRoutes(io)
    app.use((req, res, next) => {
        req.io = io
        next()
    })

    app.use('/auth', authRouter)
    app.use('/manage', manageRouteMap)
    app.use('/users', userRouter)
    app.use('/profile', profileRouter)
    app.use('/home', homeRouter)
    app.use('/chat', chatrouter)
    app.use('/common', commonRouter)
    app.use('/subscribe', LandingPageRouter)
    app.use('/notifications', notificationRouter)
    app.use('/projects', projectRouter)
    app.use('/ai', artificialIntelligenceRouter)
    app.use('/article', articleRouter)
    app.use('/talents', talentRouter)

    app.get('/', (req, res) => {
        res.json({
            message: 'Welcome to OpenNezt API',
        })
    })
}

export default route
