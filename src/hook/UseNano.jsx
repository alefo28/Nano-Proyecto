import { useContext } from "react";
import NanoContext from "../context/NanoProvider";

const useNano = () => {
  return useContext(NanoContext);
};

export default useNano;
