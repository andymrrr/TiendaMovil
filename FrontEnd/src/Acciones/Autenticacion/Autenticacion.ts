import { TiendaApi } from "../../Config/Api/TiendaApi";
import { Usuario } from "../../Dominios/Entidad/Usuario";
import { AutenticacionRespuesta } from "../../Infraestructura/Interfaces/Autenticacion.Respuesta";

const retornarUsuarioToken = (data : AutenticacionRespuesta)=>{
    const usuario: Usuario ={
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        isActive: data.isActive,
        roles : data.roles
    }

    return {
        usuario: usuario,
        token: data.token
    }
}

export const AutenticacionLogin = async(correo: string, contrasena: string ) => {
    try {
        correo = correo.toLowerCase();    
        const {data} = await TiendaApi.post<AutenticacionRespuesta>("/auth/login",{
            email: correo,
            password: contrasena
        });

        return retornarUsuarioToken(data);

    } catch (error) {
        console.log(error);
        return null;
        
    }
} 

export  const AutenticacionVerificarSesion = async() => {
    try {
        const {data} = await TiendaApi.get<AutenticacionRespuesta>("/auth/check-status");
        return retornarUsuarioToken(data);
    } catch (error) {
        console.log(error)
        return null
    }
}