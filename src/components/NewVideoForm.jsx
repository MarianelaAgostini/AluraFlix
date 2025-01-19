import React, { useState } from 'react';
import '../styles/Form.css';

const NewVideoForm = ({ onAddVideo, categories, onClose }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCategory =
      category === 'new' ? newCategory : category;

    const newVideo = {
      title,
      image,
      videoUrl,
      category: selectedCategory,
      description,
    };

    onAddVideo(newVideo);

    setTitle('');
    setImage('');
    setVideoUrl('');
    setCategory('');
    setNewCategory('');
    setDescription('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="modal-content">
        <h2>Nuevo Video</h2>
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
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
            <option value="new">Nueva categoría</option>
          </select>
        </div>
        {category === 'new' && (
          <div className="form-field">
            <input
              type="text"
              placeholder="Nueva categoría"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-field">
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="button" onClick={onClose} className="cancel-button">
            Cancelar
          </button>
          <button type="submit" className="save-button">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewVideoForm;
