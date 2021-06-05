import dotenv from 'dotenv'
if (process.env.NODE_ENV=="development") {
    dotenv.config()
} else {
    dotenv.config({ path: '.env.production' })
}

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;