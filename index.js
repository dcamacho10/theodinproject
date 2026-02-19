import fs from 'node:fs'
import { createServer } from 'node:http'

const port = 3232
const host = '127.0.0.1'

const server = new createServer((req, res) => {
  const validUrls = new Set(['/', '/index', '/about', '/contact-me'])
  const { method, url } = req

  console.log(`[REQUEST-TRACKER] - method:${method} | url:${url}`)

  try {
    if (method === 'GET' && validUrls.has(url)) {
      const filePath = url === '/' ? './index.html' : `.${url}.html`
      const htmlFile = fs.readFileSync(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(htmlFile)
      return
    }
    const routeNotFoundFile = fs.readFileSync('./404.html')
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html')
    res.end(routeNotFoundFile)
  } catch (error) {
    res.statusCode = 500
    res.end(`Erro ao carregar o arquivo - ${error}`)
  }
})

server.listen(port, host, () => console.log(`Servidor ligado em http://${host}:${port}`))