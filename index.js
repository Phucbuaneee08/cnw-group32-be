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

// Trỏ tới auth
router.use( "/auth", require("./modules/auth/auth.route"));

// Trỏ tới router ở file information-homestays
router.use( "/homestays", require("./modules/user/homestays/user.homestays.route"));

// Trỏ tới router ở file booking-homestays
router.use("/admins", require("./modules/admin/bills/admin.bills.route"));

router.use("/admins", require("./modules/admin/discounts/admin.discounts.route"));

// Trỏ tới router ở file admin/service
router.use("/services", require("./modules/admin/services/admin.services.route"));

//Trỏ tới router ở file create-bills
router.use('/users',require('./modules/user/bills/user.bill.route'));

//Trỏ tới router ở file user/user
router.use('/users',require('./modules/user/user/user.user.route'));

//Trỏ tới router ở file super-admin/admin
router.use('/super-admins', require('./modules/super-admin/admin/super-admin.admin.route'))

// Trỏ tới route ở file super-admin/homestay
router.use('/super-admins', require('./modules/super-admin/homestays/super-admin.homestays.route'));

app.use(router);

module.exports = app;

