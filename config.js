// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).

// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config;

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here
    production: {
  		url: 'http://naggingjs.herokuapp.com/',
  		mail: {
           transport: 'SMTP',
           options: {
               service: 'Gmail',
               auth: {
                   user: process.env.GMAIL_NANDO_ACCOUNT,
                   pass: process.env.GMAIL_NANDO_PASS
               }
           }
       },
      database: {
        client: 'pg',
        connection: {
          host : process.env.DB_PORTFOLIO_HOST,
          user : process.env.DB_PORTFOLIO_USERNAME,
          password : process.env.DB_PORTFOLIO_PASS,
          database : process.env.DB_PORTFOLIO_DBNAME,
          port: process.env.DB_PORTFOLIO_PORT
        },
    		debug: false
      },
      server: {
          host: '0.0.0.0',
          port: process.env.PORT
      },
      logging: false
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blog's published URL.
        url: 'http://localhost:' + Number(process.env.PORT || 8080),

        // Example mail config
        // Visit http://support.ghost.org/mail for instructions
         mail: {
             transport: 'SMTP',
             options: {
                 service: 'Gmail',
                 auth: {
                     user: process.env.GMAIL_NANDO_ACCOUNT,
                     pass: process.env.GMAIL_NANDO_PASS
                 }
             }
         },

        // #### Database
        // Ghost supports sqlite3 (default), MySQL & PostgreSQL
        database: {
            client: 'pg',
            connection: {
		          host : process.env.DB_PORTFOLIO_HOST,
		          user : process.env.DB_PORTFOLIO_USERNAME,
		          password : process.env.DB_PORTFOLIO_PASS,
		          database : process.env.DB_PORTFOLIO_DBNAME,
		          port: process.env.DB_PORTFOLIO_PORT,
		          ssl: process.env.DB_HOST !== 'localhost'
		        },
            debug: true
        },
        // #### Server
        // Can be host & port (default), or socket
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: Number(process.env.PORT || 8080)
        },
        logging: true,
        // #### Paths
        // Specify where your content directory lives
        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-test.db')
            },
            pool: {
                afterCreate: function (conn, done) {
                    conn.run('PRAGMA synchronous=OFF;' +
                    'PRAGMA journal_mode=MEMORY;' +
                    'PRAGMA locking_mode=EXCLUSIVE;' +
                    'BEGIN EXCLUSIVE; COMMIT;', done);
                }
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing MySQL
    // Used by Travis - Automated testing run through GitHub
    'testing-mysql': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'mysql',
            connection: {
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing pg
    // Used by Travis - Automated testing run through GitHub
    'testing-pg': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'pg',
            connection: {
                host     : '127.0.0.1',
                user     : 'postgres',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    }
};

module.exports = config;
