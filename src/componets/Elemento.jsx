import useNano from "../hook/UseNano";

const Elemento = ({ elemento }) => {
  const { setearValor } = useNano();
  return (
    <>
      {elemento.isNull !== null && (
        <>
          {elemento.En === null ? (
            <button
              disabled
              onClick={() => {
                setearValor(elemento);
              }}
              className={` text-white border rounded w-20 bg--500  bg-${
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
