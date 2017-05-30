const {Colossus} = require('@vtex/api')
const parse = require('co-body')

const reviews = []

module.exports = {
  handler: async (req, res, ctx) => {
    if (/\/reviews$/.test(req.path)) {
      if (req.method == "GET") {
        res.status = 200
        res.body = reviews
      } else if (req.method == "POST") {
        var review = await parse.json(req)
        reviews.push(review)

        Colossus(ctx).sendEvent('vtex.review', '-', 'new-review', review)

        res.status = 201
        res.body = review
      }
    } else {
      res.status = 404
      res.body = {
        message: "Page not found: " + req.path,
      }
    }
  },

  routes: {
    "/api/reviews": {
      path: "/reviews"
    }
  }
}