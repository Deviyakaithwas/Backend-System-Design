// index.js
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const bodyParser = require('body-parser');

const app = express();
const redisClient = redis.createClient();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/queue_management', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  username: String,
});

const RequestSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  request: String,
  status: String,
});

const User = mongoose.model('User', UserSchema);
const Request = mongoose.model('Request', RequestSchema);

app.post('/api/login', async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
    user = new User({ username: req.body.username });
    await user.save();
  }
  res.json({ user });
});

app.post('/api/request', async (req, res) => {
  const { user, request } = req.body;
  const newRequest = new Request({ userId: user._id, request, status: 'pending' });
  await newRequest.save();

  redisClient.rpush(`queue:${user._id}`, newRequest._id.toString(), (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Request added to queue' });
  });
});

app.get('/api/requests/:userId', async (req, res) => {
  const requests = await Request.find({ userId: req.params.userId });
  res.json({ requests });
});

app.listen(3001, () => console.log('Server running on port 3001'));
