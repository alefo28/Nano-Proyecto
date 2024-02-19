import useNano from "../hook/UseNano";

const Elemento = ({ elemento }) => {
  const { setearValor } = useNano();
  return (
    <>
      {elemento.isNull !== null && (
        <>
        <button hidden disabled className=" bg-indigo-500 bg-black bg-lime-500 bg-violet-500 bg-sky-500 bg-red-500 bg-purple-500 bg-teal-500 bg-orange-500 bg-blue-500"></button>
          {elemento.En === null ? (
            <button
              disabled
              onClick={() => {
                setearValor(elemento);
              }}
              className={` text-white border rounded w-20   bg-${
                elemento.color === "black" ? `black` : elemento.color
              }${elemento.color === "black" ? "" : "-500"} 
               hover:bg-white hover:text-black `}
            >
              <div className="flex justify-between  p-2">
                <p className=" text-xl">{elemento.ab}</p>
                <p className=" text-sm ml-2 ">{elemento.nA}</p>
              </div>
              <div className=" text-xs ">{elemento.name}</div>
              <div className=" text-xs mb-2">
                {"--"}
              </div>
            </button>
          ) : (
            <button
              onClick={() => {
                setearValor(elemento);
              }}
              className={` text-white border rounded w-20  bg-${
                elemento.color === "black" ? `black` : elemento.color
              }${elemento.color === "black" ? "" : "-500"} 
               hover:bg-gray-400 `}
            >
              <div className="flex justify-between  p-2">
                <p className=" text-xl">{elemento.ab}</p>
                <p className=" text-sm ml-2 ">{elemento.nA}</p>
              </div>
              <div className=" text-xs ">{elemento.name}</div>
              <div className=" text-xs mb-2">
                { elemento.En}
              </div>
            </button>
          )}
        </>
      )}
    </>
  );
};

export default Elemento;
