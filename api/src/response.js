import { logger } from './winston';

export const success = (res, entity = MESSAGE) => {
  res.status(200).json(entity)
}

export const badRequest = (res) => {
  res.status(400).json({ code: 400, message: "Bad request" })
}

export const serverError = (res, err) => {
  if (process.env.NODE_ENV === "prod") {
    logger.error(`${err.name} - ${err.message}`)
  } else {
    console.log(err)
  }
  res.status(500).json({ code: 500, message: "Internal server error" })
}