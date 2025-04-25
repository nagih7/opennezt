import path from 'path'
import short from 'short-uuid'
import dotenv from 'dotenv'
import assert from 'assert'
import _ from 'lodash'

// extension for assert
const assertMsg = (key) => `Missing ${key}. Please configure it before running the application.`

// directory
export const SOURCE_DIR = path.dirname(__dirname)
export const APP_DIR = path.dirname(SOURCE_DIR)
export const PUBLIC_DIR = path.join(APP_DIR, 'public')
export const PRIVATE_DIR = path.join(APP_DIR, 'private')
export const LOG_DIR = path.join(PRIVATE_DIR, 'logs')
export const CACHE_DIR = path.join(PRIVATE_DIR, 'cache')
export const VIEW_DIR = path.join(SOURCE_DIR, 'views')

export const APP_ENV = {
    PRODUCTION: 'production',
    DEVELOPMENT: 'development',
}
export const NODE_ENV = Object.values(APP_ENV).includes(process.env.NODE_ENV)
    ? process.env.NODE_ENV
    : APP_ENV.PRODUCTION

// Loads `.env` file contents into process.env
dotenv.config({
    path: [path.join(APP_DIR, `.env.${NODE_ENV}`), path.join(APP_DIR, '.env')],
})

// environment
export const APP_DEBUG = NODE_ENV === APP_ENV.DEVELOPMENT
export const APP_NAME = process.env.APP_NAME
assert(!_.isEmpty(APP_NAME), assertMsg('APP_NAME'))

export const APP_URL_API = process.env.APP_URL_API
assert(!_.isEmpty(APP_URL_API), assertMsg('APP_URL_API'))

export const APP_URL_CLIENT = process.env.APP_URL_CLIENT
assert(!_.isEmpty(APP_URL_CLIENT), assertMsg('APP_URL_CLIENT'))

// export const APP_URL_LOCAL = process.env.APP_URL_LOCAL
// assert(!_.isEmpty(APP_URL_LOCAL), assertMsg('APP_URL_LOCAL'))

export const APP_URL_AUTH = process.env.APP_URL_AUTH
assert(!_.isEmpty(APP_URL_AUTH), assertMsg('APP_URL_AUTH'))

export const OTHER_URLS_CLIENT = process.env.OTHER_URLS_CLIENT ? JSON.parse(process.env.OTHER_URLS_CLIENT) : []
assert(_.isArray(OTHER_URLS_CLIENT), 'OTHER_URLS_CLIENT must be an array.')

export const SECRET_KEY = process.env.SECRET_KEY
assert(!_.isEmpty(SECRET_KEY), assertMsg('SECRET_KEY'))

export const LOGIN_EXPIRE_IN = process.env.LOGIN_EXPIRE_IN
assert(!_.isEmpty(LOGIN_EXPIRE_IN), assertMsg('LOGIN_EXPIRE_IN'))

export const VERIFY_EMAIL_EXPIRE_IN = process.env.VERIFY_EMAIL_EXPIRE_IN
assert(!_.isEmpty(VERIFY_EMAIL_EXPIRE_IN), assertMsg('VERIFY_EMAIL_EXPIRE_IN'))

export const REQUESTS_LIMIT_PER_MINUTE = parseInt(process.env.REQUESTS_LIMIT_PER_MINUTE, 10) || 1000

export const LINK_STATIC_URL = `${APP_URL_API}/static/`
export const LINK_RESET_PASSWORD_URL = `${APP_URL_CLIENT}/reset-password`
export const LINK_VERIFY_EMAIL_URL = `${APP_URL_API}/${APP_URL_AUTH}/verify-email`

assert(!_.isEmpty(process.env.DB_HOST), assertMsg('DB_HOST'))
assert(!_.isEmpty(process.env.DB_NAME), assertMsg('DB_NAME'))
assert(!_.isEmpty(process.env.DB_AUTH_SOURCE), assertMsg('DB_AUTH_SOURCE'))

export const DATABASE_URI =
    'mongodb+srv://' +
    process.env.DB_USERNAME +
    ':' +
    process.env.DB_PASSWORD +
    '@' +
    process.env.DB_USER +
    '.eccdc.mongodb.net/'

export const DB_NAME = process.env.DB_NAME
export const DB_USER = process.env.DB_USER
export const DB_USERNAME = process.env.DB_USERNAME
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_AUTH_SOURCE = process.env.DB_AUTH_SOURCE

export const MAIL_HOST = process.env.MAIL_HOST
export const MAIL_PORT = process.env.MAIL_PORT
export const MAIL_SECURE = process.env.MAIL_SECURE === 'true'
export const MAIL_USERNAME = process.env.MAIL_USERNAME
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD
export const MAIL_FROM_ADDRESS = process.env.MAIL_FROM_ADDRESS || MAIL_USERNAME
export const MAIL_FROM_NAME = process.env.MAIL_FROM_NAME || APP_NAME
assert(!_.isEmpty(MAIL_HOST), assertMsg('MAIL_HOST'))
assert(!_.isEmpty(MAIL_PORT), assertMsg('MAIL_PORT'))
assert(!_.isEmpty(MAIL_USERNAME), assertMsg('MAIL_USERNAME'))
assert(!_.isEmpty(MAIL_PASSWORD), assertMsg('MAIL_PASSWORD'))

// =========== WEB PUSH =========== //
export const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY
assert(!_.isEmpty(VAPID_PUBLIC_KEY), assertMsg('VAPID_PUBLIC_KEY'))
export const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY
assert(!_.isEmpty(VAPID_PRIVATE_KEY), assertMsg('VAPID_PRIVATE_KEY'))
export const MAIL_TO = process.env.MAIL_TO
assert(!_.isEmpty(MAIL_TO), assertMsg('MAIL_TO'))

// other
export const TOKEN_TYPE = {
    AUTHORIZATION: 'AUTHORIZATION',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
    VERIFY_EMAIL: 'VERIFY_EMAIL',
    ACCESS_TOKEN: 'ACCESS_TOKEN',
}
export const MAX_STRING_SIZE = 255
export const MAX_AREAS_STRING_SIZE = 500

export const UUID_TRANSLATOR = short()

export const STATUS_DEFAULT_MESSAGE = {
    401: 'Please login to continue.',
    403: 'You do not have permission to access this resource.',
    404: 'Path does not exist.',
    429: 'Too many requests. Please try again later.',
    500: 'An error occurred. Please try again later.',
}

export const JOI_DEFAULT_OPTIONS = {
    abortEarly: false,
    errors: {
        wrap: { label: false },
        language: { 'any.exists': 'any.exists' },
    },
    externals: false,
    stripUnknown: true,
    messages: {
        // boolean
        'boolean.base': '{{#label}} wrong format.',

        // string
        'string.base': '{{#label}} wrong format.',
        'string.empty': '{{#label}} cannot be left blank.',
        'string.min': '{{#label}} must not be less than {{#limit}} characters.',
        'string.max': '{{#label}} must not exceed {{#limit}} characters.',
        'string.pattern.base': '{{#label}} is not in the correct format.',
        'string.email': '{{#label}} is not in the correct format.',

        // number
        'number.base': '{{#label}} wrong format.',
        'number.integer': '{{#label}} wrong format.',
        'number.min': '{{#label}} không được nhỏ hơn {{#limit}}.',
        'number.max': '{{#label}} không được lớn hơn {{#limit}}.',

        // array
        'array.base': '{{#label}} wrong format.',
        'array.unique': 'Các {{#label}} not allow same.',
        'array.min': '{{#label}} must not have less than {{#limit}} elements.',
        'array.max': '{{#label}} must not exceed {{#limit}} elements.',
        'array.length': '{{#label}} must have exactly {{#limit}} elements.',
        'array.includesRequiredUnknowns': '{{#label}} is invalid.',
        'array.includesRequiredKnowns': '{{#label}} is invalid.',

        // object
        'object.base': '{{#label}} wrong format.',
        'object.unknown': 'The {#key} field is not defined.',
        'object.instance': '{{#label}} is not in the correct format.',

        // binary
        'binary.base': '{{#label}} wrong format.',
        'binary.min': '{{#label}} must not be less than {{#limit}} bytes.',
        'binary.max': '{{#label}} must not exceed {{#limit}} bytes.',

        // any
        'any.only': '{{#label}} is invalid.',
        'any.required': '{{#label}} cannot be left blank.',
        'any.unknown': 'The {#key} field is not defined.',
        'any.invalid': '{{#label}} is invalid.',
        'any.exists': '{{#label}} already exists.',
        'any.empty': '{{#label}} does not exist.',
        'any.invited': '{{#label}} has been invited.',
    },
}

export const VALIDATE_PHONE_REGEX = /^(0[235789])[0-9]{8}$/
export const VALIDATE_PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])/
export const VALIDATE_FULL_NAME_REGEX = /^[a-zA-ZÀ-ỹ ]+$/

// OpenAI API
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY
assert(!_.isEmpty(OPENAI_API_KEY), assert('OPENAI_API_KEY'))
export const OPENAI_ENDPOINT = process.env.OPENAI_ENDPOINT
assert(!_.isEmpty(OPENAI_ENDPOINT), assertMsg('OPENAI_ENDPOINT'))
export const OPENAI_MODEL = process.env.OPENAI_MODEL
assert(!_.isEmpty(OPENAI_MODEL), assertMsg('OPENAI_MODEL'))
export const OPENAI_API_VERSION = process.env.OPENAI_API_VERSION
assert(!_.isEmpty(OPENAI_API_VERSION), assertMsg('OPENAI_API_VERSION'))
export const MODEL = process.env.MODEL
assert(!_.isEmpty(MODEL), assertMsg('MODEL'))

export const OPENAI_ANALYZE_PROMPT_MAX_TOKENS = 200
export const OPENAI_ANALYZE_PROMPT_TEMPERATURE = 0.7
export const OPENAI_ANALYZE_PROMPT_TOP_P = 0.9
export const OPENAI_ANALYZE_PROMPT_FREQUENCY_PENALTY = 0
export const OPENAI_ANALYZE_PROMPT_PRESENCE_PENALTY = 0
export const OPENAI_ANALYZE_PROMPT_STOP = ['###']

// Azure Speech Service
export const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY
export const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION || 'eastus'

//ARTICLE CONST
export const REACTIONS_ENUM = ['like', 'dislike', 'share']
export const ARTICLE_STATUS_ENUM = ['draft', 'published', 'archived']
export const ARTICLE_AUDIENCE_ENUM = ['public', 'private', 'friends']
export const REACTION_TARGET_TYPE_ENUM = ['article', 'comment']
//END ARTICLE CONST

// LINKEDIN
export const LINKEDIN_URL = process.env.LINKEDIN_URL
export const LINKEDIN_RESPONSE_TYPE = process.env.LINKEDIN_RESPONSE_TYPE
export const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID
export const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET
export const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI
export const LINKEDIN_SCOPE = process.env.LINKEDIN_SCOPE
export const LINKEDIN_STATE = process.env.LINKEDIN_STATE

// GOOGLE
export const GOOGLE_AUTH_URL = process.env.GOOGLE_AUTH_URL
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
export const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI
export const GOOGLE_TOKEN_ENDPOINT = process.env.GOOGLE_TOKEN_ENDPOINT
export const GOOGLE_CLOUD_CREDENTIALS = process.env.GOOGLE_CLOUD_CREDENTIALS

// AI
export const AI_API_URL = process.env.AI_API_URL
export const AI_API_TOKEN = process.env.AI_API_TOKEN
export const AI_INTERVIEW_TOKEN = process.env.AI_INTERVIEW_TOKEN
export const AI_INTERVIEW_API_URL = process.env.AI_INTERVIEW_API_URL
export const AI_TEXT_TO_SPEECH_TOKEN = process.env.AI_TEXT_TO_SPEECH_TOKEN

// LINKEDIN CRAWL
export const LINKEDIN_USERNAME = process.env.LINKEDIN_USERNAME
export const LINKEDIN_PASSWORD = process.env.LINKEDIN_PASSWORD

//BLACKLISTED URLS
export const BLACKLISTED_URLS = ['traodocu.vn']

// VALID URLS TYPE
export const URL_PATTERN = new RegExp(
    '^(https?:\\/\\/)' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,}|' + // domain name
        'localhost|' + // localhost
        '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // ipv4
        '\\[([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}\\])' + // ipv6
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
    'i'
)

export const BOOKMARK_TARGET_TYPE_ENUM = ['article', 'project', 'talent']
