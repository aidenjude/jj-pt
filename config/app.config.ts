import dotenv from 'dotenv'
dotenv.config()
const envName = process.env.ENV_NAME || 'LOCAL'
const port = envName !== 'LOCAL' ? 3000 : 3001
const host = process.env.MONGO_HOST
const mongoport = process.env.MONGO_PORT
const database = process.env.MONGO_NAME
const username = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD
const ssl = process.env.MONGO_SSL
const credentials = username
  ? `${username}:${encodeURIComponent(password)}@`
  : ''
const poolSize = parseInt(process.env.MONGO_POOL_SIZE)

const mongoConnection = {
  env: envName,
  host,
  dbURL: `mongodb://${credentials}${host}/${database}?retryWrites=true`,

  options: {
    poolSize,
    useNewUrlParser: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  },
}
const appConfig = {
  port,
  envName,
}
export { appConfig, mongoConnection }
