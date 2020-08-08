import { Request, Response } from 'express'

import db from '../database/connection'
import { parseRequestToDatabase } from '../utils/objectTransform';

class ConnectionController {
  async index(req: Request, res: Response) {
    const [result] = await db('connections').count('id as total')
    return res.json({ ...result })
  }

  async create(req: Request, res: Response) {
    const { userId } = req.body

    if (!userId) {
      return res.status(422).json({
        error: 'Some field is invalid or not exists'
      })
    }

    await db('connections').insert(parseRequestToDatabase({ userId }))
    return res.status(201).send()
  }
}

export default ConnectionController
