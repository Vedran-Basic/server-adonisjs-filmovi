'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ResourceNotExistException extends LogicalException {
  handle (error, { response }) {
    return response.status(404).json({
      error:"resource doesn't exist"
    })
  }
}

module.exports = ResourceNotExistException
