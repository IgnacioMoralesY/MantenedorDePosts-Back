const { Pool } = require('pg');

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	port: '5500',
	password: 'amapola',
	database: 'postulacion'
});

module.exports = pool;
