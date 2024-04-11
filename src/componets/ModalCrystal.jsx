import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function ModalCrystal({ open, handleOpen, resultado, imagen }) {
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className=" text-center">Resultados</DialogHeader>
        <DialogBody>
          <div className="flex justify-center w-full h-full ">
            <div className="w-full h-full">
              <div className=" text-center">
                <div className="flex justify-center mt-2">
                  Constante de Celdas:{" "}
                  <span className="font-bold">{resultado.a}</span>
                </div>
                <div className=" items-center mt-4">
                  Estructura cristalina:{" "}
                  <span className="font-bold">
                    {resultado.estructuraCristalina}
                  </span>
                  <div className="flex justify-center">
                    <img
                      object-cover
                      className="w-1/4 h-1/4 ml-10 mt-2 item-center"
                      src={`../../public/${imagen}`}
                      alt="nature image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
