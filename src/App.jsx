import { useState } from "react";
import { NanoProvider } from "./context/NanoProvider";
import NanoApp from "./componets/NanoApp";

function App() {
  return (
    <NanoProvider>
      <NanoApp />
    </NanoProvider>
  );
}

export default App;
