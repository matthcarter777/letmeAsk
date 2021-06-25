import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import  logoImg from '../assets/images/logo.svg';
import  googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';

export function Home() {
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth()
  const [ roomCode, setRoomCode ] = useState('');
  
  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle()
    }

    history.push('rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === '') {
      return;
    }
    
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    console.log(roomRef.exists())

    if(!roomRef.exists()) {
      alert('Room does not exists');
      return;
    }

    history.push(`/rooms/${roomCode}`)

  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie sala de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={event => setRoomCode(event.target.value)} 
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}