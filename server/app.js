const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const compress = require('compression');
const session = require('express-session');
const helmet = require('helmet');
const lusca = require('lusca');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Keycloak = require('keycloak-connect');
const cors = require('cors');

const routes = require('./routes/index');
const users = require('./routes/users');

const isProd = process.env.NODE_ENV === 'production';
const skipAuth = process.env.NO_AUTH === 'true';
const sessionSecret = process.env.SESSION_SECRET || 'change me pls for the love of Jibbers Crabst';

const ONE_DAY = 24 * (60 * 60 * 1000);
const TWO_WEEKS = 14 * ONE_DAY;
const THIRTY_DAYS = 30 * ONE_DAY;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  compress({
    filter: (req, res) => {
      return /json|text|javascript|css|font|svg/.test(res.getHeader('Content-Type'));
    },
    level: 9,
  })
);

// session
const memoryStore = new session.MemoryStore();
app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: sessionSecret,
    cookie: {
      // session expiration is set by default to 30 days
      maxAge: THIRTY_DAYS,
      // httpOnly flag makes sure the cookie is only accessed
      // through the HTTP protocol and not JS/browser
      httpOnly: true,
      // secure cookie should be turned to true to provide additional
      // layer of security so that the cookie is set only when working
      // in HTTPS mode.
      secure: false,
    },
    name: 'sessionId',
    store: memoryStore,
  })
);

// helmet
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(
  helmet.hsts({
    maxAge: TWO_WEEKS,
    includeSubDomains: true,
    force: true,
  })
);

// lusca
// app.use(lusca.csrf());
// app.use(lusca.csp({ /* ... */}));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.p3p('ABCDEF'));
// app.use(lusca.hsts({ maxAge: 31536000 }));
app.use(lusca.xssProtection(true));
app.use(lusca.nosniff());
app.use(lusca.referrerPolicy('same-origin'));

// At a minimum, disable X-Powered-By header
app.disable('x-powered-by');

app.set('trust proxy', 1); // trust first proxy

if (!isProd) {
  app.use(cors());
}

const keycloak = new Keycloak({
  store: memoryStore,
});

app.use(
  keycloak.middleware({
    logout: '/logout',
    admin: '/',
  })
);

if (skipAuth) app.post('/login', (req, res) => res.redirect(302, '/'));
else
  app.post('/login', keycloak.protect(), (req, res) =>
    // This request handler gets called on a POST to /login if the user is already authenticated
    res.redirect(302, '/')
  );

// Keycloak callbak; do not keycloak.protect() to avoid users being authenticated against their will via XSS attack
app.get('/login', (req, res) => res.redirect(302, '/'));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {},
  });
});

module.exports = app;
