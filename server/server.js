const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/youtubeAnalyzer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const VideoSchema = new mongoose.Schema({
  channelName: String,
  videoId: String,
  subscriberCount: Number,
  likes: Number,
  views: Number,
  comments: Number,
});

const VideoModel = mongoose.model('Video', VideoSchema);

// API endpoint for analyzing the YouTube video
app.post('/analyze', async (req, res) => {
  try {
    const { videoLink } = req.body;

    // Extract video ID from the link
    const videoId = videoLink.split('v=')[1];

    // Call YouTube API to get video details
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=AIzaSyAdQ721sCGd54xSqYYhMXYATzEi52S7jRg`
    );

    const videoDetails = response.data.items[0].snippet;
    const statistics = response.data.items[0].statistics;

    // Calculate Earning Potential
    const earningPotential =
      Math.min(statistics.subscriberCount, statistics.viewCount) +
      10 * statistics.commentCount +
      5 * statistics.likeCount;

    // Save video details to MongoDB
    const newVideo = new VideoModel({
      channelName: videoDetails.channelTitle,
      videoId: videoId,
      subscriberCount: statistics.subscriberCount,
      likes: statistics.likeCount,
      views: statistics.viewCount,
      comments: statistics.commentCount,
    });

    await newVideo.save();

    res.json({
      channelName: videoDetails.channelTitle,
      videoId: videoId,
      earningPotential: earningPotential,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});