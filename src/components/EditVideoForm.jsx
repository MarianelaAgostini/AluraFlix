import React, { useState } from 'react';
import '../styles/Form.css';

const EditVideoForm = ({ video, onEditVideo, categories, onClose }) => {
  const [title, setTitle] = useState(video.title);
  const [image, setImage] = useState(video.image);
  const [videoUrl, setVideoUrl] = useState(video.videoUrl);
  const [category, setCategory] = useState(video.category);
  const [description, setDescription] = useState(video.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedVideo = {
      ...video,
      title,
      image,
      videoUrl,
      category,
      description
    };
    onEditVideo(editedVideo);
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="modal-content">
        <h2>Editar Video</h2>
        <div className="form-field">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <input
            type="url"
            placeholder="URL de la imagen"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <input
            type="url"
            placeholder="URL del video"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-actions">
          <button 
            type="button" 
            onClick={onClose}
            className="cancel-button"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            className="edit-button"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVideoForm;

