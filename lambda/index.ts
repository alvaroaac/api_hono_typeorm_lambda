import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'
import indexRouter from '../src/routes'

import '../src/database' // import database

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))
app.route('/api', indexRouter)

export const handler = handle(app)