import redis from '../config/redis.js';

async function checkToken(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    if (await redis.existAsync(token)) {
      return next();
    } else {
      return res.status(400).json({ message: 'Token is expired!'});
    }
  } else {
    return res.status(400).json({ message: 'Token is expired!' });
  }
}

// eslint-disable-next-line import/prefer-default-export
export { checkToken };
