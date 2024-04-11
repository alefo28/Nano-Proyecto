import { Fragment, useState, useEffect } from "react";
/* import { Dialog, Transition } from "@headlessui/react";
 */ import TablaPeriodica from "./TablaPeriodica";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Modal = ({ isOpen, cerrarModal, isfirst }) => {
  return (
    <Dialog
      open={isOpen}
      handler={cerrarModal}
      className=" flex justify-center"
      size="xxl"
    >
      <div>
        <DialogHeader>
          <div className="flex justify-between">
            <p>Tabla de Electronegatividad</p>
            <Button
              variant="text"
              color="red"
              onClick={cerrarModal}
              className="ml-2 border border-gray-500 p-2"
            >
              <span>Cancel</span>
            </Button>
          </div>
        </DialogHeader>
        <DialogBody>
          <div className=" -mt-6 ">
            <p className="text-sm text-gray-500 mb-2">Seleccione un Elemento:</p>

            <TablaPeriodica />
          </div>
        </DialogBody>
      </div>
    </Dialog>
  );
};

export default Modal;
{
  /*  */
}
