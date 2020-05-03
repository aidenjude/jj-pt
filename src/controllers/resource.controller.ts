import { ResourceModel } from '../models/resource'
import logger from '../util/logger'
export class ResourceController {
  private collectionName = 'resource'
  async get(req: any, res: any) {
    let response: Pick<import('mongoose').Document, '_id'>[] = []
    let status = 200
    const query = req.params ?? {}
    try {
      response = await ResourceModel.find(query).lean()
    } catch (error) {
      logger.log('error', error)
      res.status(500).send()
    }
    return res.status(status).json(response)
  }
  async post(req: any, res: any) {
    let response = {}
    let status = 200
    const query = req.body
    if (query) {
      try {
        response = ResourceModel.create(query)
      } catch (error) {
        logger.log('error', error)
        res.status(500).send()
      }
    } else {
      throw new Error('No payload provided')
    }

    return res.status(status).json(response)
  }
}
