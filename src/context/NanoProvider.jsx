import { createContext, useState } from "react";

const NanoContext = createContext();

const NanoProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isfirst, setIsfirst] = useState(null);
  const [primerEl, setPrimerEl] = useState(0);
  const [segundoEl, setSegundoEl] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [spinner, setSpinner] = useState(false);

  const cerrarModal = () => {
    setIsOpen(!isOpen);
  };
  const revisar = (is) => {
    setMensaje("");
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

  function determinarEstructuraCristalina(angulosDifraccion, longitudOnda) {
    const umbral = 2; // Umbral de tolerancia para comparaciones de ángulos

    // Comparamos los ángulos de difracción con los ángulos característicos de cada estructura
    const angulosCubica = [90, 90, 90];
    const angulosTetragonal = [90, 90, 90];
    const angulosOrtorrombica = [90, 90, 90];
    const angulosHexagonal = [90, 90, 120]; // Ángulos para la estructura hexagonal
    const angulosMonoclinica = [90, 90, 90];
    const angulosTriclinica = [90, 90, 90];

    // Función para verificar si dos conjuntos de ángulos son iguales dentro de un umbral
    function sonIguales(angulos1, angulos2) {
      for (let i = 0; i < angulos1.length; i++) {
        if (Math.abs(angulos1[i] - angulos2[i]) > umbral) {
          return false;
        }
      }
      return true;
    }

    // Función para calcular la constante de la celda elemental "a"
    function calcularConstanteCelda(lambda, theta, h, k, l) {
      return (
        (lambda / (2 * Math.sin((theta * Math.PI) / 180))) *
        Math.sqrt(h ** 2 + k ** 2 + l ** 2)
      );
    }

    // Comprobamos cada tipo de estructura cristalina
    if (sonIguales(angulosDifraccion, angulosCubica)) {
      return {
        estructuraCristalina: "Cúbica",
        a: calcularConstanteCelda(longitudOnda, angulosDifraccion[0], 1, 1, 1),
      };
    } else if (sonIguales(angulosDifraccion, angulosTetragonal)) {
      return {
        estructuraCristalina: "Tetragonal",
        a: calcularConstanteCelda(longitudOnda, angulosDifraccion[0], 1, 1, 0),
      };
    } else if (sonIguales(angulosDifraccion, angulosOrtorrombica)) {
      return {
        estructuraCristalina: "Ortorrómbica",
        a: calcularConstanteCelda(longitudOnda, angulosDifraccion[0], 1, 1, 1),
      };
    } else if (sonIguales(angulosDifraccion, angulosHexagonal)) {
      return {
        estructuraCristalina: "Hexagonal",
        a: calcularConstanteCelda(longitudOnda, angulosDifraccion[0], 1, 1, 1),
      };
    } else if (sonIguales(angulosDifraccion, angulosMonoclinica)) {
      return {
        estructuraCristalina: "Monoclínica",
        a: calcularConstanteCelda(longitudOnda, angulosDifraccion[0], 1, 1, 1),
      };
    } else if (sonIguales(angulosDifraccion, angulosTriclinica)) {
      return {
        estructuraCristalina: "Triclínica",
        a: calcularConstanteCelda(longitudOnda, angulosDifraccion[0], 1, 1, 1),
      };
    } else {
      return { estructuraCristalina: "Estructura desconocida", a: null }; // Si ninguno de los ángulos coincide
    }
  }

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
        determinarEstructuraCristalina,
      }}
    >
      {children}
    </NanoContext.Provider>
  );
};

export { NanoProvider };

export default NanoContext;
