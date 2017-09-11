import { WebApp } from 'meteor/webapp'
import express from 'express'
import multer from 'multer'
import path from 'path'
import {ImageModel } from 'pcmli.umbrella.backend'

const multerUpload = multer({dest: 'uploads/'}).single('file')
const app = express()

app.post('/images/upload/', multerUpload, function (req, res) {

  const model = new ImageModel()
  model.upload(req.file.path).then((result) => {
    res.status(200).send(result)
  }).catch((error) => {

    res.status(422).send(error)
  })
})

WebApp.connectHandlers.use(Meteor.bindEnvironment(app))
