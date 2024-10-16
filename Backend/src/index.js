import express from 'express'
import path from 'path'
import serveFavicon from 'serve-favicon'
import helmet from 'helmet'
import multer from 'multer'
import {APP_DEBUG, NODE_ENV, PUBLIC_DIR, VIEW_DIR} from './configs'

import {jsonify, sendMail} from './handlers/responseHandler'
import corsHandler from './handlers/corsHandler'
import httpRequestHandler from './handlers/httpRequestHandler'
import limiter from './handlers/rateLimitHandler'
import formDataHandler from './handlers/formDataHandler'
import initLocalsHandler from './handlers/initLocalsHandler'
import notFoundHandler from './handlers/notFoundHandler'
import errorHandler from './handlers/errorHandler'
import cookieParser from 'cookie-parser'

// import routes
import route from './routes'

function createApp() {
    // Init app
    const app = express()

    // Config cookie-parser
    app.use(cookieParser())

    app.response.jsonify = jsonify
    app.response.sendMail = sendMail

    app.set('env', NODE_ENV)
    app.set('trust proxy', 1)
    app.set('views', VIEW_DIR)
    app.set('view engine', 'ejs')

    app.use(corsHandler)
    if (APP_DEBUG) {
        app.use(httpRequestHandler)
    }
    app.use(limiter)
    app.use(serveFavicon(path.join(PUBLIC_DIR, 'favicon.ico')))
    app.use('/static', express.static(PUBLIC_DIR))
    app.use(helmet())

    // Sử dụng expres parser để xử lý dữ liệu thành dạng json
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(multer({storage: multer.memoryStorage()}).any())
    app.use(formDataHandler)
    app.use(initLocalsHandler)

    route(app)

    // Not found handler
    app.use(notFoundHandler)

    // Error handler
    app.use(errorHandler)

    return app
}

export default createApp
