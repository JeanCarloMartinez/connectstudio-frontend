import AdminSectionTitle from "./AdminSectionTitle";
import AdminButton from "./AdminButton";

// Importar la funcion solicitarDatosAdmin para obtener los valores de la vista
// import { obtenerDatosAdmin } from "./../../../services/admin.service";
import { obtenerAdmin } from "./../../../services/admin.service";
import { useEffect, useState } from "react";

// Importar la funcion solicitrar

const AdminProfileView = ({ adminUser, onEditProfile }) => {
  // Estado para almacenar los datos del admin
  const [datosAdmin, setDatosAdmin] = useState({
    // Declarar valores por defecto del objeto admin
    nombre: "Administrador",
    email: "No se ha ingresado un email",
    fotoPerfil: false,
  });

  useEffect(() => {
    // Funcion que solicita los datos del admin al servidor
    const solicitarDatosAdmin = async () => {
      // Obtener dinamicamente los datos del admin
      const respuesta = await obtenerAdmin();
      console.log("Datos obtenidos de admin", respuesta.admin);
      // Guardar los datos del admin en una variable
      const admin = respuesta.admin;
      console.log(admin);
      // Validar si la respuesta fue exitosa
      if (respuesta.success) {
        setDatosAdmin({
          nombre: admin.nombrecompletousuario,
          email: admin.emailusuario,
          fotoPerfil: false,
        });
      }
    }; // Fin de la funcion solicitarDatosAdmin

    // Ejecutar la funcion solicitarDatosAdmin
    solicitarDatosAdmin();
  }, []);

  console.log("Datos del administrador:", datosAdmin);

  return (
    <>
      <AdminSectionTitle
        title="Perfil del Administrador"
        description="Visualiza y gestiona la información de tu cuenta de administrador."
      />
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 max-w-2xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-6xl border-4 border-blue-300 mb-4">
            {datosAdmin.nombre.charAt(0).toUpperCase()}
          </div>
          <h3 className="text-3xl font-bold text-gray-800">
            {datosAdmin.nombre}
          </h3>
          <p className="text-gray-500 text-lg">{datosAdmin.email}</p>
        </div>

        <div className="space-y-6 text-gray-700">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <p className="text-xl font-semibold mb-2">Nombre Completo:</p>
            <p className="text-2xl">{adminUser.role}</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <p className="text-xl font-semibold mb-2">Correo Electronico:</p>
            <p className="text-2xl">{adminUser.lastLogin}</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <p className="text-xl font-semibold mb-2">Fecha de Nacimiento:</p>
            <p className="text-2xl">{adminUser.id}</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <p className="text-xl font-semibold mb-2">Dirección:</p>
            <p className="text-2xl">{adminUser.id}</p>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <AdminButton onClick={onEditProfile} type="primary">
            Editar Perfil
          </AdminButton>
        </div>
      </div>
    </>
  );
};

export default AdminProfileView;
