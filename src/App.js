import './App.css';
import Header from './components/Header';
import Characters from './components/Characters';
import ThemeContext from './context/ThemeContext';
import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{darkMode, setDarkMode}}>
      <div className={`App ${darkMode ? 'dark' : 'light'}`} >
        <Header/>
        <Characters/>
      </div>
    </ThemeContext.Provider>

  );
}

export default App;
