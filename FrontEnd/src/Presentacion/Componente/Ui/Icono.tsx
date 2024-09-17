import {  StyleSheet } from 'react-native'
import React from 'react'
import { Icon, useTheme } from '@ui-kitten/components';
interface Propiedad  {
    nombre: string;
    color?: string;
    blanco?: boolean;
}
export const Icono = ({nombre,color,blanco}: Propiedad) => {
    const tema = useTheme()
    if(blanco)
    {
        color = tema["color-info-100"]
    }
    else if(!color)
    {
        color = tema["text-basic-color"]
    }
    else{
        color = tema[color] ?? tema["text-basic-color"]
    }
  return <Icon style={Estilo.icono} fill={color} name={nombre}
/>
}

const Estilo = StyleSheet.create({
    icono: {
        width:32,
        height:32
    }
})

