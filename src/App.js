import { useState } from 'react';

import './styles/index.css';

import { Main, Nav } from './styles.jsx';

const axios = require('axios');

function App() {

  let [userName, setUserName] = useState();

  let [estadoRequisicao, setEstadoRequisicao] = useState();
  let [repositorios, setRepositorio] = useState([]);

  function pesquisaUsuario()
  {
    if (userName !== '')
    {
      axios.get(`https://api.github.com/users/${userName}/repos`)
      .then((resposta) => {
        setRepositorio(resposta.data);
        setEstadoRequisicao('Requisicao feita com sucesso');
      }).catch(function()
      {
        setRepositorio([])
        return false;
      })
    }
  }

  return (
    <div className="App">
      <Main>
        <section id='informacoes'>
          <header>
            <Nav>
              <a href='https://hexalab.com.br/n/'>
                <img src='https://hexalab.com.br/n/static/media/hexalab-icon.33463a0b.svg' alt='HexaLab - Logo' />
              </a>
            </Nav>
          </header>

          <form>
            <input
              placeholder="Nome do Usuário"
              onChange={(ev) => {
                let inputValue = ev.target.value;

                setUserName(inputValue);
              }}
            />

            <button
              onClick={(ev) => {
                ev.preventDefault();

                pesquisaUsuario();
              }}
            >
              Pesquisar
            </button>
          </form>
        </section>

        <section id='repositorios'>
            {
              repositorios.map((value, key) => {
                return(
                  <a href={value.html_url} key={key}>
                    <div className='repositorio_single'>
                      <h3>{value.name}</h3>

                      <img src={value.owner.avatar_url} alt={`Foto de ${value.owner.login}`} />

                      <p>Linguagem: {value.language}</p>
                      <time>Criado em: {value.created_at}</time>
                    </div>
                  </a>
                )
              })
            }
        </section>
      </Main>
    </div>
  );
}

export default App;
