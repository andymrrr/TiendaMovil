import { create } from "zustand";
import { Usuario } from "../../../Dominios/Entidad/Usuario";
import { AutenticacionEstatus } from "../../../Infraestructura/Interfaces/Autenticacion.Estatus";
import { AutenticacionLogin, AutenticacionVerificarSesion } from "../../../Acciones/Autenticacion/Autenticacion";
import { AdaptadorStorage } from "../../../Config/Adaptador/Adaptador-Storage";

interface EstadoAutenticacion {
    usuario?: Usuario;
    token?: string;
    estatus: AutenticacionEstatus;


    IniciarSesion : (correo: string, contrasena: string) => Promise<boolean>;
    ValidarSesion : () => Promise<void>;
    CerrarSesion : ()=> Promise<void>

}


export const usarAutentecacionStore = create<EstadoAutenticacion>()((set,get) => ({
    estatus: "Validando",
    token: undefined,
    usuario: undefined,

    IniciarSesion : async (correo: string, contrasena: string) => {
      
        
        const respuesta = await AutenticacionLogin(correo,contrasena);
        if (!respuesta) {
            set({estatus:'NoAutenticado', token:undefined, usuario:undefined})
            return false
        }
        await AdaptadorStorage.EstablecerElemento("token",respuesta.token)

        set({estatus:"Autenticado", usuario: respuesta.usuario, token: respuesta.token})
        return true;
    },
    ValidarSesion : async() => {
        const respuesta = await AutenticacionVerificarSesion() 

        if (!respuesta) {
            set({estatus:'NoAutenticado', token:undefined, usuario:undefined})
            return;
        }
        await AdaptadorStorage.EstablecerElemento("token",respuesta.token)

        set({estatus:"Autenticado", usuario: respuesta.usuario, token: respuesta.token})
        
    },
    CerrarSesion :async ()=> {
        await AdaptadorStorage.EliminarElemento("token");
        set({estatus:'NoAutenticado', token:undefined, usuario:undefined})

    }
 

}) )