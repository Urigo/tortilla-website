const express = require('express')
const bodyPraser = require('body-parser')
const sendMail = require('sendmail')()
const { validateEmail, validateLength } = require('./utils/validations')

const api = new express.Router()
api.use(bodyPraser.json())

api.post('/contact', (req, res) => {
  const body = req.body

  try {
    validateEmail('body.email', body.email)
  }
  catch (e) {
    res.status(403)
    res.send(e.message)
    return
  }

  try {
    validateLength('body.details', body.details, 10, 1000)
  }
  catch (e) {
    res.status(403)
    res.send(e.message)
    return
  }

  const descriptor = {
    from: `"${body.email}" <no-reply@tortilla.academy>`,
    to: 'emanor6@gmail.com',
    subject: 'Incoming message',
    text: body.details,
  }

  sendMail(descriptor, (err) => {
    if (err) {
      res.status(500).send(err.message)
    }
    else {
      res.send()
    }
  })
})

module.exports = api
