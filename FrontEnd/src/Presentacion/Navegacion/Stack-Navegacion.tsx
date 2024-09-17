import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from '@react-navigation/stack';
import {CargandoPantalla} from '../Pantallas/Cargando/Cargando-Pantalla';
import {LoginPantalla} from '../Pantallas/Autenticacion/Login-Pantalla';
import {RegistrarPantalla} from '../Pantallas/Autenticacion/Registrar-Pantalla';
import {InicioPantalla} from '../Pantallas/Inicio/Inicio-Pantalla';
import {ProductosPantalla} from '../Pantallas/Productos/Productos-Pantalla';

export type RootStackParametros = {
  CargandoPantalla: undefined;
  LoginPantalla: undefined;
  RegistrarPantalla: undefined;
  InicioPantalla: undefined;
  ProductosPantalla: {productoId: string};
};
const Stack = createStackNavigator<RootStackParametros>();
const animacion: StackCardStyleInterpolator = ({current}) => {
  return {
    cardStyle: {
       opacity: current.progress
    },
  };
};
export const StackNavegacion = () => {
  return (
    <Stack.Navigator
      initialRouteName="CargandoPantalla"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CargandoPantalla" component={CargandoPantalla} />
      <Stack.Screen
        options={{cardStyleInterpolator: animacion}}
        name="LoginPantalla"
        component={LoginPantalla}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: animacion}}
        name="RegistrarPantalla"
        component={RegistrarPantalla}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: animacion}}
        name="InicioPantalla"
        component={InicioPantalla}
      />
      <Stack.Screen name="ProductosPantalla" component={ProductosPantalla} />
    </Stack.Navigator>
  );
};
