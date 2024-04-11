import React, { useState } from "react";
import useNano from "../hook/UseNano";
import { Alert } from "@material-tailwind/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ModalCrystal from "../componets/ModalCrystal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Difraccion de rayos X",
    },
  },
};

export default function Cristalina() {
  const [picos, setPicos] = useState([0, 0]);
  const [onda, setOnda] = useState("");
  const [resultado, setResultado] = useState([]);
  const [alerta, setAlerta] = useState({ msg: "", error: false });
  const [dataGrafic, setDataGrafic] = useState([]);
  const [imagen, setImagen] = useState("");
  const [open, setOpen] = useState(false);

  const { determinarEstructuraCristalina } = useNano();

  const data = {
    labels: dataGrafic.map((valor, index) => {
      return index === 0 ? "--" : `Pico ${index}`;
    }),
    datasets: [
      {
        label: "Picos de difracción",
        data: dataGrafic.map((valor, index) => {
          return valor;
        }),
        borderColor: "rgb(77, 229, 105)",
        backgroundColor: "rgba(20, 238, 0, 0.5)",
      },
    ],
  };

  // Función para manejar el cambio en los valores ingresados por el usuario
  const handleChange = (index, e) => {
    const nuevosValores = [...picos];
    nuevosValores[index] = e.target.value;
    setPicos(nuevosValores);
  };

  // Función para agregar un nuevo input
  const agregarInput = () => {
    setPicos([...picos, ""]);
  };

  // Función para eliminar un input
  const eliminarInput = (index) => {
    if (picos.length > 2) {
      const nuevosValores = [...picos];
      nuevosValores.splice(index, 1);
      setPicos(nuevosValores);
    }
  };

  const calculate = () => {
    if ([onda, picos].includes("")) {
      setAlerta({ msg: "Todos los campos deben ser llenados", error: true });
      setTimeout(() => {
        setAlerta({ msg: "", error: false });
      }, 2000);
      return;
    }
    setAlerta({ msg: "", error: false });
    const estructura = determinarEstructuraCristalina(picos, onda);

    // Creamos una nueva copia del array con el 0 agregado al inicio
    const nuevoArray = [0, ...picos];
    // Actualizamos el estado con el nuevo array
    setDataGrafic(nuevoArray);

    console.log(estructura.estructuraCristalina);
    if (estructura.estructuraCristalina == "Cúbica") {
      setImagen("Cubic.svg");
    } else if (estructura.estructuraCristalina == "Tetragonal") {
      setImagen("Tetragonal.svg");
    } else if (estructura.estructuraCristalina == "Ortorrómbica") {
      setImagen("Orthorhombic.svg");
    } else if (estructura.estructuraCristalina == "Hexagonal") {
      setImagen("Hexagonal_latticeFRONT.svg");
    } else if (estructura.estructuraCristalina == "Monoclínica") {
      setImagen("Monoclinic.svg");
    } else if (estructura.estructuraCristalina == "Triclínica") {
      setImagen("Triclinic.svg");
    } else {
      setImagen("cubo.png");
    }
    setResultado(estructura);
    handleOpen();
  };

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <div className=" mt-4 border border-gray-200 mb-4 mx-4 rounded-2xl">
        <header className="my-10">
          <h1 className="text-black text-center text-4xl font-black">
            Determinar La red Cristalina
          </h1>
        </header>
        <main className=" ">
          <div className=" w-full  p-10 bg-gray-200">
            <div className="flex justify-center mb-6">
              Ingrese los siguientes valores:
            </div>
            {alerta.error && (
              <div className="mx-2 mt-2">
                <Alert color="red" className="mb-2 p-2">
                  {alerta.msg}
                </Alert>
              </div>
            )}
            <div className="flex justify-around">
              <div>
                <p>Longitud de onda:</p>
                <input
                  value={onda}
                  onChange={(e) => setOnda(e.target.value)}
                  type="number"
                  placeholder={`Valor `}
                  className="rounded-lg my-4 p-2 "
                />
              </div>
              <div className=" items-center">
                <div className="flex justify-between mb-4 items-center w-80">
                  <p className="">Picos de difraccion:</p>{" "}
                  <button
                    onClick={agregarInput}
                    className=" border bg-green-400 hover:bg-green-500 p-2 rounded-lg "
                  >
                    Agregar{" "}
                  </button>
                </div>
                {picos.map((valor, index) => (
                  <div>
                    {index + 1} -{" "}
                    <input
                      key={index}
                      type="number"
                      value={valor}
                      onChange={(e) => handleChange(index, e)}
                      placeholder={`Pico ${index + 1}`}
                      className="rounded-lg my-2 mr-4 p-2 "
                    />
                    {picos.length > 2 && (
                      <button
                        className=" rounded-lg bg-red-400 hover:bg-red-500  p-2 "
                        onClick={() => eliminarInput(index)}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className=" w-1/2">
                <Line options={options} data={data} />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={calculate}
                className=" p-2 bg-green-400 hover:bg-green-500  rounded-lg"
              >
                Calcular
              </button>
            </div>
          </div>

          {resultado.estructuraCristalina && (
            <ModalCrystal
              open={open}
              handleOpen={handleOpen}
              resultado={resultado}
              imagen={imagen}
            />
          )}
        </main>
      </div>
    </>
  );
}
