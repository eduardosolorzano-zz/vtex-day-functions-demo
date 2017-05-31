var counter = 0

module.exports = {
  events: {},

  handler: async (req, res, ctx) => {
    res.status = 200
    res.body = counter + ' reviews received'
  },

  routes: {'/review-statistics': {}}
}