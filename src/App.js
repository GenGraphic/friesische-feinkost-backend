import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Locations from './pages/Locations';
import Posts from './pages/Posts';
import LogIn from './pages/LogIn';
import TexteEditor from './pages/TexteEditor';
import Speisekarte from './pages/Speisekarte';
import ImageEditor from './pages/ImageEditor';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/Locations' element={<Locations />} />
        <Route path='/Posts' element={<Posts />} />
        <Route path='/TextEditor' element={<TexteEditor />} />
        <Route path='/Speisekarte' element={<Speisekarte />} />
        <Route path='/ImageEditor' element={<ImageEditor />} />
      </Routes>
    </div>
  );
}

export default App;
