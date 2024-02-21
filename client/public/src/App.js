import React, { useState } from 'react';
import axios from 'axios';
import Result from './components/Result';
import Loader from './components/Loader';

function App() {
  const [videoLink, setVideoLink] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setVideoLink(e.target.value);
  };

  const analyzeVideo = async () => {
    try {
      setLoading(true);

      const response = await axios.post('http://localhost:5000/analyze', {
        videoLink: videoLink,
      });

      setResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>YouTube Video Analyzer</h1>
      <input
        type="text"
        placeholder="Enter YouTube Video Link"
        value={videoLink}
        onChange={handleInputChange}
      />
      <button onClick={analyzeVideo}>Analyze</button>

      {loading && <Loader />}

      {result && <Result {...result} />}
    </div>
  );
}

export default App;
