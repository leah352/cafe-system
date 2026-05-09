const errorMiddleware = (err, req, res, next) => {
  try {
    console.error('Error on', req.method, req.originalUrl);
    // Log full error object including non-enumerable properties that some libraries attach
    console.error('Error details:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
  } catch (logErr) {
    // Fallback to default logging
    console.error('Error logging failure:', logErr);
    console.error(err && err.stack ? err.stack : err);
  }

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
};

module.exports = { errorMiddleware };
