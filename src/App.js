import React, { useState, useEffect } from 'react';
import './styles/global.css';
import Home from './components/Home';
import NewVideoForm from './components/NewVideoForm';
import EditVideoForm from './components/EditVideoForm';

const API_URL = 'http://localhost:3001';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showNewVideoForm, setShowNewVideoForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
    fetchCategories();
  }, []);

  const fetchVideos = async () => {
    const response = await fetch(`${API_URL}/videos`);
    const data = await response.json();
    setVideos(data);
  };

  const fetchCategories = async () => {
    const response = await fetch(`${API_URL}/categories`);
    const data = await response.json();
    setCategories(data);
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const addVideo = async (newVideo) => {
    const response = await fetch(`${API_URL}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVideo),
    });
    const savedVideo = await response.json();
    setVideos([...videos, savedVideo]);

    if (!categories.some((cat) => cat.name === newVideo.category)) {
      await addCategory(newVideo.category);
    }

    setShowNewVideoForm(false);
  };

  const editVideo = async (editedVideo) => {
    const response = await fetch(`${API_URL}/videos/${editedVideo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedVideo),
    });
    const updatedVideo = await response.json();
    setVideos(videos.map((video) => (video.id === updatedVideo.id ? updatedVideo : video)));

    if (!categories.some((cat) => cat.name === editedVideo.category)) {
      await addCategory(editedVideo.category);
    }

    setEditingVideo(null);
  };

  const deleteVideo = async (videoId) => {
    await fetch(`${API_URL}/videos/${videoId}`, {
      method: 'DELETE',
    });
    setVideos(videos.filter((video) => video.id !== videoId));
  };

  const addCategory = async (categoryName) => {
    const color = generateRandomColor();
    const newCategory = { name: categoryName, color };
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    });
    const savedCategory = await response.json();
    setCategories([...categories, savedCategory]);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>ALURAFLIX</h1>
        <button onClick={() => setShowNewVideoForm(true)}>Agregar video</button>
      </header>
      {showNewVideoForm && (
        <NewVideoForm
          onAddVideo={addVideo}
          categories={categories}
          onClose={() => setShowNewVideoForm(false)}
        />
      )}
      {editingVideo && (
        <EditVideoForm
          video={editingVideo}
          onEditVideo={editVideo}
          categories={categories}
          onClose={() => setEditingVideo(null)}
        />
      )}
      <Home
        videos={videos}
        categories={categories}
        onEditVideo={setEditingVideo}
        onDeleteVideo={deleteVideo}
      />
      <footer>
        <h2 className='footer'>ALURAFLIX</h2>
        <p className='desarrollo'>Desarrollado por Marianela Agostini</p>
      </footer>
    </div>
  );
};

export default App;

