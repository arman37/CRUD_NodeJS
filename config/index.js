/**
 *
 * @author arman
 * @since 25/2/2016.
 *
 */
'use strict';

const config = {
	local: {
		mode: 'local',
		port: 3000,
		mysql: {
      host: 'localhost',
      driver: 'mysql',
      user: 'root',
      database: 'node_crud',
      password: '123'
		}
	},
	staging: {
		mode: 'staging',
		port: 4000,
		mysql: {
      host: 'HOST_NAME',
      driver: 'mysql',
      user: 'USER_NAME',
      database: 'DB_NAME',
      password: '123'
		}
	},
	production: {
		mode: 'production',
		port: 5000,
		mysql: {
      host: 'HOST_NAME',
      driver: 'mysql',
      user: 'USER_NAME',
      database: 'DB_NAME',
      password: '123'
		}
	}
};

module.exports = (mode) => {
	return config[mode || process.argv[2] || 'local'] || config.local;
};