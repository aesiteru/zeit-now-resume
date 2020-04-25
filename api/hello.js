module.exports = (req, res) => {
  res.json({
    body   : res.body,
    query  : req.query,
    cookies: req.cookies
  })
}