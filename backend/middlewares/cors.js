const allowlist = [
  'http://mesto.lazarenkoea.nomoredomains.monster',
  'https://api.mesto.lazarenkoea.nomoredomains.rocks',
  'http://api.mesto.lazarenkoea.nomoredomains.rocks',
  'https://mesto.lazarenkoea.nomoredomains.monster',
  'http://localhost:3000',
  'https://localhost:3000',
];

const corsOptions = {
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

module.exports = (req, callback) => {
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions.origin = true;
  } else {
    corsOptions.origin = false;
  }
  callback(null, corsOptions);
};

/* module.exports = corsOptionsDelegate; */

/* const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
};
 */
