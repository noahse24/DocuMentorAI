const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
    user: 'postgres',     // DB user
    host: 'localhost',    // DB host
    database: 'document_management',  // DB name
    password: 'Trunes29', // DB password
    port: 5432            // DB port
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
    } else {
        console.log('Connected to the database:', res.rows[0].now);
    }
});

// Export the pool for use in other modules
module.exports = pool;