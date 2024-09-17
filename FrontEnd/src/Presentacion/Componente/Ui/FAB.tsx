
import { Button } from '@ui-kitten/components'
import { Icono } from './Icono'
import { StyleProp, ViewStyle } from 'react-native';
interface Propiedad{
    icono: string;
    onPress: ()=> void;
    estilo?: StyleProp<ViewStyle>; 
}
export const FAB = ({estilo, icono,onPress}: Propiedad) => {
  return (
   <Button
    style={[{
        shadowColor:"black",
        shadowOffset:{
            width:0,
            height:10
        },
        shadowOpacity:0.4,
        shadowRadius:10,
        elevation:3,
        borderRadius:13
    },estilo]}
    accessoryLeft={<Icono nombre={icono} blanco/>}
    onPress={onPress}
   />
   
  )
}

