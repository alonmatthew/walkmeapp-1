const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport'),
  passportConfig = require('./config/passport.js'),
  appRoutes = require('./routes/app.js'),
  ownerRoutes = require('./routes/owner.js'),
  walkerRoutes = require('./routes/walker.js'),
  dotenv = require('dotenv').load({silent: true}),
  flash = require('connect-flash'),
  MongoDBStore = require('connect-mongodb-session')(session),

  PORT = process.env.port || 3000,
  mongooseConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/walkme-app'

// mongodb connection
mongoose.connect(mongooseConnectionString, (err) => {
  console.log(err || "Connected to MongoDB at " + mongooseConnectionString)
})

const store = new MongoDBStore({
  uri: mongooseConnectionString,
  collection: 'sessions'
});

// middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(process.env.PWD + '/client/public'))
app.use(flash())
app.use(session({
	secret: 'boooooooooom',
	cookie: {maxAge: 60000000},
	resave: true,
	saveUninitialized: false,
  store: store
}))

app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'html')

// routes
app.use('/', appRoutes)
app.use('/owner', ownerRoutes)
app.use('/walker', walkerRoutes)

// currentUser:
app.use((req, res, next) => {
	app.locals.currentUser = req.owner || req.walker
	app.locals.loggedIn = !!req.owner || !!req.walker
  next()
})

// server connection
app.listen(PORT, (err) => {
  console.log(err || "Server running on port: " + PORT)
})
