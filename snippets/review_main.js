const {Colossus} = require('@vtex/api')
const parse = require('co-body')

const reviews = []

module.exports = {
  handler: async (req, res, ctx) => {
    if (/\/reviews$/.test(req.path)) {
      if (req.method == 'POST') {
        const body = await parse.json(req)
        reviews.push(body)

        Colossus(ctx).sendEvent('vtex.review', '-', 'new-review', body)

        res.status = 200
        res.body = body
      } else if (req.method == 'GET') {
        res.status = 200
        res.body = reviews
      }
    } else {
      res.status = 404
      res.body = {
        message: "Page not found: " + req.path,
      }
    }
  },

  routes: {
    '/reviews': {
      path: '/reviews'
    }
  }
}