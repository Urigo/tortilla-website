const express = require('express')
const bodyPraser = require('body-parser')
const sendMail = require('sendmail')()

const api = new express.Router()
api.use(bodyPraser.json())

api.use('/contact', (req, res) => {
  const body = req.body

  if (typeof body.name != 'string') {
    res.status(403)
    res.send('"body.name" string must be provided')
    return
  }

  if (body.name.length > 30) {
    res.status(403)
    res.send('"body.name" must be less than 30 characters long')
    return
  }

  if (typeof body.subject != 'string') {
    res.status(403)
    res.send('"body.subject" string must be provided')
    return
  }

  if (body.subject.length > 100) {
    res.status(403)
    res.send('"body.subject" must be less than 100 characters long')
    return
  }

  if (typeof body.text != 'string') {
    res.status(403)
    res.send('"body.text" string must be provided')
    return
  }

  if (body.text.length > 1000) {
    res.status(403)
    res.send('"body.text" must be less than 1000 characters long')
    return
  }

  const descriptor = {
    from: `"${body.name}" <no-reply@tortilla.academy>`,
    to: 'uri.goldshtein@gmail.com',
    subject: body.subject,
    text: body.text,
  }

  sendMail(descriptor, (err) => {
    if (err) {
      res.status(500).send(err.message)
    }
    else {
      res.send(descriptor)
    }
  })
})

module.exports = api
