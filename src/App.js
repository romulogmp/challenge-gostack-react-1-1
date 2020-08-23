import React, { useState, useEffect } from 'react';
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setProjects] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
        setProjects(response.data);
    });
}, []);

  async function handleAddRepository() {
    const data = {};
    const response = await api.post('/repositories', data);
    const repository = response.data;
    setProjects([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const filterRepositories = repositories.filter(rep => rep.id !== id)
    setProjects(filterRepositories)
  }
  
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(rep => (
          <li key={rep.id}> {rep.title} 
            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
            </button>
        </li>))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
