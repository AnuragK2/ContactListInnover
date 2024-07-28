import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ContactListComponent from './components/ContactListComponent';
import FormComponent from './components/FormComponent';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<ContactListComponent />} />
        <Route path="create-contact" element={<FormComponent />} />
        <Route path="update-contact/:id" element={<FormComponent />} />
      </Route>
    </Routes>
  );
};

export default App;