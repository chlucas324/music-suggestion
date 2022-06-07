const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({})
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    expires: 30 * 60 * 1000,
  },
  resave: true,
  rolling:true,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));

const routes = require('./controllers')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

// app.use(require('./controllers/'));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});