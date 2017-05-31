var counter = 0

module.exports = {
  events: {
    'vtex.review:*:new-review': async (body, ctx) => {
      counter++
    }
  },

  handler: async (req, res, ctx) => {
    res.status = 200
    res.body = counter + ' reviews received'
  },

  routes: async function(ctx) {
    if (counter > 0) {
      return {'/review-statistics': {}}
    } else {
      return {}
    }
  }
}