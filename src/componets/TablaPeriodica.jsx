import { ELEMENTOS } from "../Constantes";
import Elemento from "./Elemento";

const TablaPeriodica = () => {
  return (
    <>
      <table className=" w-full">
        {ELEMENTOS.map((filas) => (
          <tr>
            {filas.map((elemento) => (
              <th className=" text-sm">
                <Elemento key={elemento.nA} elemento={elemento} not={true} />
              </th>
            ))}
          </tr>
        ))}
      </table>
    </>
  );
};

export default TablaPeriodica;
