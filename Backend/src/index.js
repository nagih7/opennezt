import express from 'express'
import path from 'path'
import serveFavicon from 'serve-favicon'
import helmet from 'helmet'
import multer from 'multer'
import {APP_DEBUG, NODE_ENV, PUBLIC_DIR, VIEW_DIR} from './configs'
import Messenger from './models/messenger'
import {jsonify, sendMail} from './handlers/responseHandler'
import corsHandler from './handlers/corsHandler'
import httpRequestHandler from './handlers/httpRequestHandler'
import limiter from './handlers/rateLimitHandler'
import formDataHandler from './handlers/formDataHandler'
import initLocalsHandler from './handlers/initLocalsHandler'
import notFoundHandler from './handlers/notFoundHandler'
import errorHandler from './handlers/errorHandler'
import cookieParser from 'cookie-parser'

import WebSocket from 'ws'
import route from './routes'

function createApp() {
    const app = express()

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

    app.use(express.json({limit: '20mb'}))
    app.use(express.urlencoded({extended: true, limit: '20mb'}))
    app.use(multer({storage: multer.memoryStorage()}).any())
    app.use(formDataHandler)
    app.use(initLocalsHandler)

    route(app)

    app.use(notFoundHandler)
    app.use(errorHandler)

    const server = require('http').createServer(app)

    const wss = new WebSocket.Server({server})

    wss.on('connection', (ws) => {
        console.log('A new WebSocket client connected')

        ws.on('message', async (message) => {
            console.log('received: %s', message)
            const { senderId, receiverId } = JSON.parse(message)
            const content = JSON.parse(message).message
        
            
            const newMessage = new Messenger({
                senderId: senderId, 
                receiverId: receiverId,
                message: content,
                date: new Date().toISOString(),
            })
            try {
                console.log('Saving message to database:', newMessage)
                await newMessage.save()
                console.log('Message saved successfully:', newMessage)
            }
            catch (error) {
                console.error('Error handling message:', error)
            }
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message)
                }
            })
        })

        ws.on('close', () => {
            console.log('A WebSocket client disconnected')
        })
    })

    return server
}

export default createApp
