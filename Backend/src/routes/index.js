import authRouter from './authRouter'
import userRouter from './userRouter'
import homeRouter from './homeRouter'

function route(app) {
    app.use('/auth', authRouter)
    app.use('/users', userRouter)
    app.use('/home', homeRouter)

    app.get('/', (req, res) => {
        res.jsonify({
            message: 'Welcome to OpenNezt API',
        })
    })
}

export default route
