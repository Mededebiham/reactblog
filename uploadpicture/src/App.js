// frontend/src/App.js
import React from 'react';
import ImageUpload from "./components/ImageUpload";
import Profile from "./components/Profile";


const App = () => {
  return (
      <div>
        <h1>Image Upload and Profile</h1>
        <ImageUpload />
        <Profile />
      </div>
  );
};

export default App;
