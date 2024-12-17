import authRouter from './authRouter'
import userRouter from './userRouter'
import homeRouter from './homeRouter'
import chatrouter from './chatRouter'
import commonRouter from './commonRouter'
import LandingPageRouter from './subscribe.js'
import notificationRouter from './notificationRouter'
import projectRouter from './projectRouter'
import socketRoutes from './socket'

function route(app, io) {
    socketRoutes(io)
    app.use((req, res, next) => {
        req.io = io
        next()
    })

    app.use('/auth', authRouter)
    app.use('/users', userRouter)
    app.use('/home', homeRouter)
    app.use('/chat', chatrouter)
    app.use('/common', commonRouter)
    app.use('/subscribe', LandingPageRouter)
    app.use('/notification', notificationRouter)
    app.use('/project', projectRouter)

    app.get('/', (req, res) => {
        res.json({
            message: 'Welcome to OpenNezt API',
        })
    })
}

export default route
