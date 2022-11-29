import express from 'express'

import wordsRoute from './categoriesRoute'
import categoriesRoute from './wordsRoute'

const router = express.Router()

router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    processEnv: process.env.NODE_ENV || 'not set',
    CURRENT_PROJECT: process.env.CURRENT_PROJECT,
  })
})

router.use('/categories', categoriesRoute) //add routes
router.use('/words', wordsRoute)

export default router
