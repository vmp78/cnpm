const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const exp = require('constants');
const methodOverride = require('method-override');
const session = require('express-session');


const route = require('./routes');
const db = require('./config/db');



// const AuthMiddleware = require('./app/middlewares/AuthMiddleware')
const SomethingMiddleware = require('./app/middlewares/SomethingMiddleware')

const app = express();
const port = 3000;

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// override
app.use(methodOverride('_method'))

// active seassion
app.use(session({
    secret: 'hehe',
    resave: true,
    saveUninitialized: true
}));

// app.use((req, res, next) => {
//     req.session.info = {
//         username: 'anonymous',
//         pass: 'anonymous'
//     }
//     next();
// });

// Custum middlewares
// app.use(SortMiddleware)
// app.use(AuthMiddleware)
app.use(SomethingMiddleware)

// temple engine
app.engine(
    'hbs',
    hbs.engine({
        extname: '.hbs',
        helpers: {
            set0: (a) => a=0,
            sum: (a, b) => a + b,
            mul: (a, b) => a * b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'

                const icons = {
                    default: 'bi bi-filter',
                    asc: 'bi bi-sort-alpha-down',
                    desc: 'bi bi-sort-alpha-down-alt',
                }
                const types = {
                    default: 'asc',
                    desc: 'asc',
                    asc: 'desc',

                }

                const icon = icons[sortType]
                const type = types[sortType]
                
                return `<a href="?_sort&column=${field}&type=${type}">
                <i class="${icon}"></i>
                </a>`;
                // thiếu bảo mật
            },
            isEqual: (value1, value2) => {
                if (value1 === value2) {
                    return true;
                } else {
                    return false;
                }
            },
            neq: (value1, value2) => {
                if (value1 === value2) {
                    return false;
                } else {
                    return true;
                }
            },
            countWithFieldValue: (array, fieldName1, fieldValue1, fieldName2, fieldValue2) => {
                let count = 0;

                array.forEach(function(item) {
                    if (item[fieldName1] === fieldValue1 && item[fieldName2] === fieldValue2) {
                      count++;
                    }
                  });
                
                return count;
            },
            formatNumber: (number) => {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
        },
    }),
);


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// connect to db
db.connect();

