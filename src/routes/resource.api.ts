import express from 'express'
const router = express.Router()
import { ResourceController } from '../controllers/index'

router.get('/resources', async (req, res) => {
  const resource = new ResourceController()
  resource.get(req, res)
})

router.post('/resources', async (req, res) => {
  const resource = new ResourceController()
  resource.post(req, res)
})

module.exports = router
