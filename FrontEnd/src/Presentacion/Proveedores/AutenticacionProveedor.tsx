
import React, { PropsWithChildren, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParametros } from '../Navegacion/Stack-Navegacion'
import { usarAutentecacionStore } from '../Store/Autenticacion/Usar-Autenticion.Store'

const AutenticacionProveedor = ({children}: PropsWithChildren) => {
    const navegacion = useNavigation<StackNavigationProp<RootStackParametros>>()
    const {estatus,ValidarSesion} = usarAutentecacionStore()
    useEffect(() => {
      ValidarSesion()
    }, [])
    
    useEffect(() => {
        if (estatus ==="Autenticado") {
            navegacion.reset({
                index:0,
                routes: [{name:"InicioPantalla"}]
            })
        }
        else if (estatus === "NoAutenticado") {
            navegacion.reset({
                index:0,
                routes:[{name:"LoginPantalla"}]
            })
        }
    
    
    }, [estatus])
    
  return (
    <>
        {children}
    
    </>
  )
}

export default AutenticacionProveedor