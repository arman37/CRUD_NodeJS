'use strict';

var config = {
	local: {
		mode: 'local',
		port: 3000,
		mysql: {
			"host": "localhost",
			"driver": "mysql",
			"user": "root",
			"database": "node_crud",
			"password": ""
		}
	},
	staging: {
		mode: 'staging',
		port: 4000,
		mysql: {
			"host": "",
			"driver": "mysql",
			"user": "root",
			"database": "DB-Name",
			"password": ""
		}
	},
	production: {
		mode: 'production',
		port: 5000,
		mysql: {
			"host": "",
			"driver": "mysql",
			"user": "root",
			"database": "DB-Name",
			"password": ""
		}
	}
};

module.exports = function(mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
};