import { useState } from "react";
import { NanoProvider } from "./context/NanoProvider";
import ElectroNegatividad from "./pages/ElectroNegatividad";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Cristalina from "./pages/Cristalina";

function App() {
  return (
    <NanoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ElectroNegatividad />} />
            <Route path="/cristalina" element={<Cristalina />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NanoProvider>
  );
}

export default App;
