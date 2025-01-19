import React, { useEffect, useState } from 'react';
import VideoList from './VideoList';
import '../styles/Home.css';

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFC133'];

const Home = ({ videos, categories, onEditVideo, onDeleteVideo }) => {
  const [categoriesWithColors, setCategoriesWithColors] = useState([]);

  useEffect(() => {
    const updatedCategories = categories.map((category) => ({
      ...category,
      color: category.color || colors[Math.floor(Math.random() * colors.length)],
    }));
    setCategoriesWithColors(updatedCategories);
  }, [categories]);

  // Filter categories to only show those with videos
  const categoriesWithVideos = categoriesWithColors.filter(category => 
    videos.some(video => video.category === category.name)
  );

  return (
    <div className="home">
      {categoriesWithVideos.map((category) => (
        <div
          key={category.id}
          className="category"
          style={{
            backgroundColor: category.color,
            color: '#fff',
            borderRadius: '8px',
            padding: '16px',
          }}
        >
          <h2>{category.name}</h2>
          <VideoList
            videos={videos.filter((video) => video.category === category.name)}
            onEditVideo={onEditVideo}
            onDeleteVideo={onDeleteVideo}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;

