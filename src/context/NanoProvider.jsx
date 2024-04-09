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

  function determinarEstructuraCristalina(angulos, longitudOnda) {
    
    // Convertir los ángulos de los picos de difracción de grados a radianes
    const angulosRadianes = angulos.map((angulo) => (angulo * Math.PI) / 180);

    // Función para calcular la constante de celda elemental "a" según la ley de Bragg
    const calcularConstanteCelda = (angulo, longitudOnda) => {
      return longitudOnda / (2 * Math.sin(angulo / 2));
    };

    // Array para almacenar todas las constantes de celda calculadas
    const constantesCelda = angulosRadianes.map((angulo) =>
      calcularConstanteCelda(angulo, longitudOnda)
    );

    // Determinar la estructura cristalina más probable
    const estructurasCristalinas = [
      "Cúbica",
      "Tetragonal",
      "Ortorrómbica",
      "Romboédrica",
      "Monoclínica",
      "Triclínica",
    ];
    const estructuraCristalina = determinarEstructura(constantesCelda);

    return {
      estructuraCristalina,
      constantesCelda,
    };
  }

  function determinarEstructura(constantesCelda) {
    const estructurasCristalinas = [
      "Cúbica",
      "Tetragonal",
      "Ortorrómbica",
      "Romboédrica",
      "Monoclínica",
      "Triclínica",
    ];
    const valoresTípicos = {
      Cúbica: [1, 1, 1],
      Tetragonal: [1, 1, Math.sqrt(2)],
      Ortorrómbica: [1, Math.sqrt(2), Math.sqrt(3)],
      Romboédrica: [1, 1, Math.sqrt(3)],
      Monoclínica: [1, 1, Math.sqrt(2)],
      Triclínica: [1, 1, 1],
    };

    let mejorCoincidencia = null;
    let mejorDiferencia = Number.MAX_VALUE;

    for (const estructura of estructurasCristalinas) {
      const valoresTipicosEstructura = valoresTípicos[estructura];
      const diferencia = calcularDiferencia(
        constantesCelda,
        valoresTipicosEstructura
      );
      if (diferencia < mejorDiferencia) {
        mejorDiferencia = diferencia;
        mejorCoincidencia = estructura;
      }
    }

    return mejorCoincidencia;
  }

  // Función auxiliar para calcular la diferencia entre dos conjuntos de constantes de celda
  function calcularDiferencia(constantesCelda1, constantesCelda2) {
    let diferenciaTotal = 0;
    for (let i = 0; i < constantesCelda1.length; i++) {
      diferenciaTotal += Math.abs(constantesCelda1[i] - constantesCelda2[i]);
    }
    return diferenciaTotal;
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
