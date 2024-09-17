import { View, Text } from 'react-native'
import React from 'react'
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Icono } from '../Componente/Ui/Icono';

interface Propiedad {
  Titulo:string;
  SubTitulo?: string;
  AccionDerechaIcono?: string;

  AccionDerecha?: () => void;
  children?: React.ReactNode;


}
export  const LayoutPrincipal = ({AccionDerecha,AccionDerechaIcono,SubTitulo,Titulo,children}:Propiedad) => {
  const {top} = useSafeAreaInsets()
  const {canGoBack, goBack} = useNavigation();
  const renderizarBotonAtras = ()=> {
   
   return <TopNavigationAction 
      icon={<Icono nombre='arrow-back-outline'  />}
      onPress={() => goBack()}
    />
  }
  const RenderizarBotonDerecho = ()=> {
   if(AccionDerecha ===undefined || AccionDerechaIcono ===undefined){
    return null
   }
    return <TopNavigationAction 
       icon={<Icono nombre={AccionDerechaIcono}  />}
       onPress={() => AccionDerecha()}
     />
   }
  return (
    <Layout style={{marginTop: top}}>
      <TopNavigation
        title={Titulo}
        subtitle={SubTitulo}
        alignment="center"
        accessoryLeft={canGoBack() ? renderizarBotonAtras : undefined}
        accessoryRight={()=> <RenderizarBotonDerecho/>}
      />
        <Divider/>
        <Layout style={{ height: '100%' }}>
          {children}
        </Layout>
     
    </Layout>
  )
}
