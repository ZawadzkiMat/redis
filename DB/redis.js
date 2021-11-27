const Redis = require('ioredis');

const CONFIG = require('../config/config');

exports.redis = new Redis(CONFIG.REDIS_CONFIG);
