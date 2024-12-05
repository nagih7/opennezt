import cors from 'cors'
import {APP_URL_CLIENT, OTHER_URLS_CLIENT} from '@/configs'

export const corsOptions = {
    origin: '*',
    credentials: true,
}

const corsHandler = cors(corsOptions)

export default corsHandler
