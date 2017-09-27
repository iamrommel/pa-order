import { onCreateConnection, defaultConnection } from './connection'

export class Model {

  constructor (name, {schema, connectionName}) {
    this.schema = schema
    this.connectionName = connectionName

    return this.connection().model(name, schema)
  }

  connection () {
    if (this.connectionName) {
      return onCreateConnection(this.connectionName)
    }

    return defaultConnection
  }
}
