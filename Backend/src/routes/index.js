import authRouter from './authRouter'
import userRouter from './userRouter'
import homeRouter from './homeRouter'
import adminRouter from './adminRouter'

function route(app) {
    app.use('/auth', authRouter)
    app.use('/users', userRouter)
    app.use('/home', homeRouter)
    app.use('/manage', adminRouter)

    app.get('/', (req, res) => {
        res.jsonify({
            message: 'Welcome to OpenNezt API',
        })
    })
}

export default route
