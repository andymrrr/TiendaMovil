import {Button, Input, Layout, Text} from '@ui-kitten/components';
import React, { useState } from 'react';
import {Alert, ScrollView, useWindowDimensions} from 'react-native';
import { Icono } from '../../Componente/Ui/Icono';
import { RootStackParametros } from '../../Navegacion/Stack-Navegacion';
import { StackScreenProps } from '@react-navigation/stack';
import { API_URL, STAGE } from '@env';
import { usarAutentecacionStore } from '../../Store/Autenticacion/Usar-Autenticion.Store';

interface Propiedad extends StackScreenProps<RootStackParametros,"LoginPantalla">{}
export const LoginPantalla = ({navigation,route}: Propiedad) => {
  const {height} = useWindowDimensions();
  const [formulario, setFormulario] = useState({
    correo:"",
    contrasena: ""
  })
  const [cargando, setCargando] = useState(false)
 const {IniciarSesion} = usarAutentecacionStore()

  const OnIniciarSesion = async () =>{
    if (formulario.correo.length === 0 && formulario.contrasena.length === 0)
    {
        return ;
    }
    setCargando(true)
    const exitosa = await IniciarSesion(formulario.correo,formulario.contrasena);
    setCargando(false)
    if(exitosa)
    {
      return;
    }

    Alert.alert("Error", "Usuario o Contraseña erroneo")

  }
  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor ingresa para Continuar</Text>
        </Layout>

        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Correo Electronico"
            accessoryLeft={<Icono nombre='email-outline'/>}
            style={{marginBottom: 10}}
            keyboardType="email-address"
            autoCapitalize="none"
            value={formulario.correo}
            onChangeText={(email)=> setFormulario({...formulario, correo: email})}
          />
          <Input
            placeholder="Contraseña"
            style={{marginBottom: 10}}
            accessoryLeft={<Icono nombre='lock-outline' />}
            secureTextEntry
            autoCapitalize="none"
            value={formulario.contrasena}
            onChangeText={(contrasena)=> setFormulario({...formulario, contrasena: contrasena})}
          />
        </Layout>

        <Layout style={{height: 20}} />

        <Layout>
          <Button 
            accessoryRight={<Icono nombre='arrow-forward-outline' blanco />}
            onPress={() => OnIniciarSesion() }
            disabled={cargando}
            >Ingresar</Button>
        </Layout>

        <Layout style={{height: 30}} />

        <Layout style={{
          alignItems:"flex-end",
          flexDirection:"row",
          justifyContent:"center"
        }}>
          <Text>¿No tienes cuenta?</Text>
          <Text status='primary' category='s1' onPress={()=> navigation.navigate("RegistrarPantalla")} > Crea una Cuenta</Text>

        </Layout>
      </ScrollView>
    </Layout>
  );
};
