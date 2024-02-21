import { createContext, useState } from "react";

const NanoContext = createContext();

const NanoProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isfirst, setIsfirst] = useState(true);
  const [primerEl, setPrimerEl] = useState(0);
  const [segundoEl, setSegundoEl] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [spinner, setSpinner] = useState(false);

  const cerrarModal = () => {
    setIsOpen(!isOpen);
  };
  const revisar = (is) => {
    if (is) {
      setPrimerEl(0);
      
    } else {
      setSegundoEl(0);

    }
    setMensaje("")  
    setIsOpen(true);
    setIsfirst(is);
  };

  const setearValor = (valor) => {

    if (isfirst) {
      setPrimerEl(valor);
    } else {
      setSegundoEl(valor);
    }

    setIsOpen(false);
  };

  const calcularElectro = () => {
    setSpinner(true);
    const valor1 = primerEl.En;
    const valor2 = segundoEl.En;

    let num = valor1 - valor2;
    let res = num < 0 ? num * -1 : num;
    if (num < 0 ? num * -1 <= 0.4 : num < 0.4) {
      setMensaje(`Δ En: ${res.toFixed(2)}, Covalente no Polar`);
    } else if (num < 0 ? num * -1 < 1.7 : num < 1.7) {
      setMensaje(`Δ En: ${res.toFixed(2)}, Covalente Polar`);
    } else {
      setMensaje(`Δ En: ${res.toFixed(2)}, Ionico`);
    }
    setTimeout(() => {
      setSpinner(false);
    }, 1000);
  };
  return (
    <NanoContext.Provider
      value={{
        isOpen,
        isfirst,
        primerEl,
        segundoEl,
        mensaje,
        spinner,
        cerrarModal,
        revisar,
        setearValor,
        calcularElectro,
      }}
    >
      {children}
    </NanoContext.Provider>
  );
};

export { NanoProvider };

export default NanoContext;
