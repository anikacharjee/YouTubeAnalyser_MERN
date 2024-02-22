# YouTube Video Analyzer

## Overview

YouTube Video Analyzer is a web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This application allows users to input a YouTube video link from a specific channel. The system then analyzes the provided video along with the top two performing videos of the same channel based on engagement metrics such as subscriber count, likes, views, and comments.

## Features

- **Input Video Link:** Users can input a YouTube video link from the desired channel.

- **Analysis:** The application uses the YouTube API to retrieve video details and calculates the Earning Potential based on a specified formula.

- **Top Performing Videos:** The result page showcases the top three performing videos for the given channel, including the one provided and the two other top-performing videos.

## Project Structure

The project follows the MERN stack structure, with separate folders for the frontend (`client`) and backend (`server`).

### Folder Structure

- **client:** Contains the React.js frontend.
  - **src/components:** Reusable React components.
  - **src/App.js:** Main component for the application.

- **server:** Contains the Node.js backend.
  - **server.js:** Main file for the backend logic.

