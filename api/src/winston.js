import winston from 'winston'

const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
  transports: [
    // consoleTransport
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
}
export const logger = new winston.createLogger(myWinstonOptions)