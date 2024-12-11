import authRouter from './authRouter'
import userRouter from './userRouter'
import homeRouter from './homeRouter'
import chatrouter from './chatRouter'
import commonRouter from './commonRouter'
import LandingPageRouter from './subscribe.js'
import SeekProjectRouter from './seekRouter'
import notificationRouter from './notificationRouter'

function route(app) {
    app.use('/auth', authRouter) // Dùng router cho các route liên quan đến auth
    app.use('/users', userRouter) // Dùng router cho các route liên quan đến người dùng
    app.use('/home', homeRouter) // Dùng router cho các route trang chủ
    app.use('/chat', chatrouter) // Dùng router cho các route chat (bao gồm cả WebSocket route)
    app.use('/common', commonRouter) // Dùng router cho các route chung
    app.use('/subscribe', LandingPageRouter)
    app.use('/seek', SeekProjectRouter)
    app.use('/notification', notificationRouter) // Dùng router cho các route liên quan đến thông báo

    app.get('/', (req, res) => {
        res.json({
            message: 'Welcome to OpenNezt API',
        })
    })
}

export default route
