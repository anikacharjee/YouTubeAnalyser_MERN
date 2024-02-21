import React from 'react';

const Result = ({ channelName, videoId, earningPotential }) => {
  return (
    <div>
      <h2>Result</h2>
      <p>Channel Name: {channelName}</p>
      <p>Video ID: {videoId}</p>
      <p>Earning Potential: {earningPotential}</p>
    </div>
  );
};

export default Result;
