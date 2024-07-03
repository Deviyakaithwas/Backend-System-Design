// processQueue.js
const mongoose = require('mongoose');
const redis = require('redis');

mongoose.connect('mongodb://localhost:27017/queue_management', { useNewUrlParser: true, useUnifiedTopology: true });

const redisClient = redis.createClient();

const RequestSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  request: String,
  status: String,
});

const Request = mongoose.model('Request', RequestSchema);

const processQueue = async () => {
  redisClient.keys('queue:*', async (err, keys) => {
    if (err) throw err;

    for (const key of keys) {
      redisClient.lpop(key, async (err, requestId) => {
        if (err) throw err;
        if (requestId) {
          const request = await Request.findById(requestId);
          if (request) {
            // Process the request here
            request.status = 'processed';
            await request.save();
          }
        }
      });
    }
  });
};

setInterval(processQueue, 1000); // Process queues every second
