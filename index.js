let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
let logger = require('morgan');
let cors = require('cors');

require('dotenv').config();

let app = express();

const corsOptions = {
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
};

app.use('/upload', express.static('upload'));
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb', parameterLimit: 50000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

// user routers here
const router = express.Router();

// Trỏ tới router ở file information-homestays
router.use( "/homestays", require("./modules/user/homestays/user.homestays.route"));

// Trỏ tới router ở file booking-homestays
router.use("/admins", require("./modules/admin/bills/admin.bills.route"));

app.use(router);

module.exports = app;

