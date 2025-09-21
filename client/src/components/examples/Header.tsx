import Header from '../Header';
import { useState } from 'react';

export default function HeaderExample() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <Header 
      darkMode={darkMode} 
      toggleDarkMode={() => setDarkMode(!darkMode)} 
    />
  );
}