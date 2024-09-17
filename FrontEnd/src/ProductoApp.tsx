import 'react-native-gesture-handler';
import React from 'react';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavegacion} from './Presentacion/Navegacion/Stack-Navegacion';
import {useColorScheme} from 'react-native';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import AutenticacionProveedor from './Presentacion/Proveedores/AutenticacionProveedor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ClienteConsulta =  new QueryClient()
export const ProductoApp = () => {
  const ColorEsquema = useColorScheme();
  const tema = ColorEsquema === 'dark' ? eva.dark : eva.light;
  const colorFondo =
    ColorEsquema === 'dark' ? tema['color-basic-800'] : tema['color-basic-100'];
  return (
    <QueryClientProvider client={ClienteConsulta}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={tema}>
        <NavigationContainer
          theme={{
            dark: ColorEsquema === 'dark',
            colors: {
              primary: tema['color-primary-500'],
              background: colorFondo,
              card: tema['color-basic-100'],
              text: tema['text-basic-color'],
              border: tema['color-basic-100'],
              notification: tema['color-primary-500'],
            },
          }}>
          <AutenticacionProveedor>
            <StackNavegacion />
          </AutenticacionProveedor>
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  );
};
