import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <div className=" bg-gray-200 flex justify-center p-4 ">
        <div className=" mr-10 hover:text-gray-500">
          <Link to={"/"}>Electronegatividad</Link>
        </div>
        <div className="hover:text-gray-500">
          <Link to="/cristalina"> Determinar Estructura Cristalina</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
