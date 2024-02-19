import { useState } from "react";
import Modal from "./Modal";
import useNano from "../hook/UseNano";
import Elemento from "./Elemento";

const NanoApp = () => {
  const {
    isOpen,
    cerrarModal,
    revisar,
    isfirst,
    primerEl,
    segundoEl,
    calcularElectro,
    mensaje,
    spinner,
  } = useNano();

  return (
    <>
      <header className="my-10">
        <h1 className="text-black text-center text-4xl font-black">Calcular Tipo De Enlace </h1>
      </header>
      <main className=" bg-gray-200">
        <div className=" md:w-full lg:flex lg:justify-between p-10">
          <div className="lg:w-1/3 sm:mb-6 md:mb-6 text-center flex justify-center">
            <button
              onClick={() => {
                revisar(true);
              }}
              className=" bg-white p-16 rounded-lg w-1/2 border-gray-400 border text-gray-600 "
            >
              {primerEl ? (
                <Elemento elemento={primerEl} />
              ) : (
                <div className=" border border-dashed border-gray-500 rounded-xl p-3">
                  Seleccione un
                  <br />
                  elemento
                </div>
              )}
            </button>
          </div>
          <div className="lg:w-1/3 sm:mb-6 md:mb-6 text-center flex justify-center  ">
            <button
              onClick={() => {
                revisar(false);
              }}
              className=" bg-white p-16 rounded-lg w-1/2 border-gray-400 border text-gray-600"
            >
              {segundoEl ? (
                <Elemento elemento={segundoEl} />
              ) : (
                <div className=" border border-dashed border-gray-500 rounded-xl p-3">
                  Seleccione un
                  <br />
                  elemento
                </div>
              )}
            </button>
          </div>
          <div className="lg:w-1/3 sm:mb-6 md:mb-6 text-center flex justify-center">
            <div className="bg-white p-10 w-1/2 rounded-lg border-gray-400 border text-gray-600">
              <p className=" font-bold text-black mb-2">Resultados:</p>
              {primerEl && segundoEl ? (
                <>
                  <button
                    onClick={() => calcularElectro()}
                    className=" rounded-lg border p-2 bg-sky-600 text-white"
                  >
                    Calcular
                  </button>
                  {spinner ? (
                    <div>Cargando...</div>
                  ) : (
                    <>
                      {mensaje !== "" && (
                        <>
                          <div className="">Tipo de Enlace:</div>
                          <div className=" text-lg text-black font-bold">
                            {mensaje}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className=" mt-6">Seleccione los Elementos</div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Modal isOpen={isOpen} cerrarModal={cerrarModal} isfirst={isfirst} />
    </>
  );
};

export default NanoApp;
