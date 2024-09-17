
import React from 'react'
import { Producto } from '../../../Dominios/Entidad/Producto'
import { Card, Text } from '@ui-kitten/components'
import { Image } from 'react-native'
import { FadeInImage } from '../Ui/FadeInImage'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParametros } from '../../Navegacion/Stack-Navegacion'
interface Propiedad{
    producto: Producto
}
export const TarjetaProducto = ({producto}:Propiedad) => {
    const navegacion = useNavigation<NavigationProp<RootStackParametros>>()
  return (
    <Card 
        style={{flex:1, backgroundColor:"F9F9F9", margin:3}} 
        onPress={()=> navegacion.navigate("ProductosPantalla",{productoId: producto.id})}
    >
        {
            (producto.images.length === 0) ?
            (<Image 
                source={require("../../../assets/no-imagen.png")}
                style={{width:'100%', height: 250}}
            />)
            :
            (
                <FadeInImage uri={producto.images[0]} style={{flex:1,height:200, width:'100%'}}/>
            )
        }
        <Text
            numberOfLines={2}
            style={{textAlign:"center"}}
        >
            {producto.title}
        </Text>
    </Card>
  )
}

