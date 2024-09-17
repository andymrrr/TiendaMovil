import {Button, Input, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import { Icono } from '../../Componente/Ui/Icono';
import { RootStackParametros } from '../../Navegacion/Stack-Navegacion';
import { StackScreenProps } from '@react-navigation/stack';

interface Propiedad extends StackScreenProps<RootStackParametros,"RegistrarPantalla">{}
export const RegistrarPantalla = ({navigation,route}: Propiedad) => {
  const {height} = useWindowDimensions();
  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.30}}>
          <Text category="h1">Registrar</Text>
          <Text category="p2">Por favor Crea una Cuenta  para Continuar</Text>
        </Layout>

        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Nombre Completo"
            accessoryLeft={<Icono nombre='person-outline'/>}
            style={{marginBottom: 10}}
            keyboardType="email-address"
          />
          <Input
            placeholder="Correo Electronico"
            accessoryLeft={<Icono nombre='email-outline'/>}
            style={{marginBottom: 10}}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="Contraseña"
            style={{marginBottom: 10}}
            accessoryLeft={<Icono nombre='lock-outline' />}
            secureTextEntry
            autoCapitalize="none"
          />
        </Layout>

        <Layout style={{height: 20}} />

        <Layout>
          <Button accessoryRight={<Icono nombre='arrow-forward-outline' blanco />} onPress={() => {}}>Registrar</Button>
        </Layout>

        <Layout style={{height: 30}} />

        <Layout style={{
          alignItems:"flex-end",
          flexDirection:"row",
          justifyContent:"center"
        }}>
          <Text>¿Ya tienes cuenta?</Text>
          <Text status='primary' category='s1' onPress={()=> navigation.pop()} > Ingresar</Text>

        </Layout>
      </ScrollView>
    </Layout>
  );
};
