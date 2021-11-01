import redis from 'redis';
import { promisify } from 'util';

const { REDIS_HOST, REDIS_PORT, REDIS_PASS } = process.env;

const memoryStore = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASS,
  db: 0
});

memoryStore.getAsync = promisify(memoryStore.get).bind(memoryStore);
memoryStore.setAsync = promisify(memoryStore.set).bind(memoryStore);
memoryStore.setExAsync = promisify(memoryStore.setex).bind(memoryStore);
memoryStore.existAsync = promisify(memoryStore.exists).bind(memoryStore);

export default memoryStore;
