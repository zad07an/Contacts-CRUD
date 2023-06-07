import React from "react";
import { Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts";
import Create from "./pages/Create";
import Layout from "./layout/Layout";
import Edit from "./pages/Edit";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Contacts />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
