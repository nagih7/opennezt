import cors from 'cors'
import { APP_URL_CLIENT, OTHER_URLS_CLIENT } from '@/configs'

export const corsOptions = {
    origin: [APP_URL_CLIENT, ...OTHER_URLS_CLIENT],
    credentials: true,
    optionsSuccessStatus: 200,
}

const corsHandler = cors(corsOptions)

export default corsHandler
