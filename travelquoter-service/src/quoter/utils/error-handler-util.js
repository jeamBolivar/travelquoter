function errorHandler(err, req, res, next) {

  return res.status(500).json({ message: 'An internal server error occurred', error: err.message });
  
}

module.exports = {errorHandler}