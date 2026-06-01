// 404 Handler
const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` })
}

// Global Error Handler
const errorHandler = (err, req, res, next) => {
  console.error('Server Error:', err.stack)
  const status = err.status || 500
  res.status(status).json({
    success: false,
    message: status === 500 ? 'Internal server error' : err.message,
  })
}

module.exports = { notFound, errorHandler }
