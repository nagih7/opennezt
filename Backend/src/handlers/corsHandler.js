import cors from 'cors'
import { APP_URL_CLIENT, OTHER_URLS_CLIENT, NODE_ENV, APP_ENV } from '@/configs'

export const corsOptions = {
   origin:
      NODE_ENV === APP_ENV.DEVELOPMENT
         ? true // Allow all origins in development
         : [APP_URL_CLIENT, ...OTHER_URLS_CLIENT],
   credentials: true,
   optionsSuccessStatus: 200,
}

const corsHandler = cors(corsOptions)

export default corsHandler
