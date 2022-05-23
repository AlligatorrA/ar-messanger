
import './App.css';
import './components/styles/necessary.css'
import Chat from './components/chat-box/Chat';
import Home from './components/home-box/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Chat/:room' element={<Chat />} />
        <Route path='*' element={<div className='all_center'>
          <h2>You have been misguided, mate!</h2>
        </div>} />


      </Routes>
    </div>
  );
}

export default App;
