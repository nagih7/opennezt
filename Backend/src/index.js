import express from 'express'
import path from 'path'
import serveFavicon from 'serve-favicon'
import helmet from 'helmet'
import multer from 'multer'
import {
   APP_DEBUG,
   NODE_ENV,
   PUBLIC_DIR,
   VIEW_DIR,
   APP_URL_CLIENT,
   MAIL_TO,
   VAPID_PUBLIC_KEY,
   VAPID_PRIVATE_KEY,
} from './configs'
import { jsonify, sendMail } from './handlers/responseHandler'
import corsHandler from './handlers/corsHandler'
import httpRequestHandler from './handlers/httpRequestHandler'
import limiter from './handlers/rateLimitHandler'
import formDataHandler from './handlers/formDataHandler'
import initLocalsHandler from './handlers/initLocalsHandler'
import notFoundHandler from './handlers/notFoundHandler'
import errorHandler from './handlers/errorHandler'
import cookieParser from 'cookie-parser'
import socketIo from 'socket.io'
import route from './routes'
import webpush from 'web-push'

function createApp() {
   const app = express()
   setupApp(app)

   const server = require('http').createServer(app)
   const io = setupSocketIo(server)

   route(app, io)

   app.use(notFoundHandler)
   app.use(errorHandler)

   webpush.setVapidDetails(`mailto:${MAIL_TO}`, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)

   return server
}

function setupApp(app) {
   app.use(cookieParser())
   app.response.jsonify = jsonify
   app.response.sendMail = sendMail

   app.set('env', NODE_ENV)
   app.set('trust proxy', 1)
   app.set('views', VIEW_DIR)
   app.set('view engine', 'ejs')

   // Health check endpoint (before other middleware)
   app.get('/health', (req, res) => {
      res.status(200).json({
         status: 'OK',
         timestamp: new Date().toISOString(),
         uptime: process.uptime(),
         environment: process.env.NODE_ENV,
      })
   })

   app.use(corsHandler)
   if (APP_DEBUG) {
      app.use(httpRequestHandler)
   }
   app.use(limiter)
   app.use(serveFavicon(path.join(PUBLIC_DIR, 'favicon.ico')))
   app.use('/static', express.static(PUBLIC_DIR))
   app.use(helmet())

   app.use(express.json({ limit: '20mb' }))
   app.use(express.urlencoded({ extended: true, limit: '20mb' }))
   app.use(multer({ storage: multer.memoryStorage() }).any())
   app.use(formDataHandler)
   app.use(initLocalsHandler)
}

function setupSocketIo(server) {
   return socketIo(server, {
      cors: {
         origin: NODE_ENV === 'development' ? true : APP_URL_CLIENT,
         methods: ['GET', 'POST'],
         allowedHeaders: ['my-custom-header'],
         credentials: true,
      },
   })
}

export default createApp
