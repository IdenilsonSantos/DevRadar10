import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {

  const [devs, setDevs] = useState([]);

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [techs, setTechs] = useState('');
  const [github_username, setGithub_username] = useState('');
  
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position)=> {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    },
    (error) => {
      console.log(error)
    });
  }, []);

  useEffect(() => {
    loadDevs();
  }, []);

  async function loadDevs(){
    const response = await api.get('/devs');
    setDevs(response.data);
  }

  async function handleSubmit(e){
      e.preventDefault();
      await api.post('/devs', {
        github_username,
        techs,
        latitude,
        longitude
      });

      setGithub_username('');
      setTechs('');

      loadDevs();

  };

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" onChange={(e) =>  setGithub_username(e.target.value)}/>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" onChange={(e) => setTechs(e.target.value)}/>
          </div>

          <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
            type="number"
            name="latitude" 
            id="latitude" 
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}/>
          </div>
          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input type="number"
            name="longitude" 
            id="longitude" 
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}/>
          </div>
          </div>

          <button className="btn" type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          
          {devs.map(dev => (
            <li className="dev-item" key={dev._id}>
              <header>
                <img src={dev.avatar_url} alt={dev.name}/>
                <div className="user-info">
                  <strong>{dev.github_username}</strong>
                  <span>{dev.techs.join(', ')}</span>
                </div>
              </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil</a>
          </li>
          ))}
        
        </ul>
      </main>
    </div>
  );
}

export default App;
