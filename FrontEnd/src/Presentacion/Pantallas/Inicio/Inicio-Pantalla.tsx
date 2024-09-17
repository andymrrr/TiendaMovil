import React from 'react';
import {usarAutentecacionStore} from '../../Store/Autenticacion/Usar-Autenticion.Store';
import {BuscarProdutoPaginado} from '../../../Acciones/Productos/Buscar-Produto-Paginado';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {LayoutPrincipal} from '../../Layout/Layout-Principal';
import {CargandoPantallaCompleta} from '../../Componente/Ui/Cargando-Pantalla-Completa';
import {Text} from '@ui-kitten/components';
import ListadoProductos from '../../Componente/Productos/Listado-Productos';
import {FAB} from '../../Componente/Ui/FAB';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ScreenProps } from 'react-native-screens';
import { RootStackParametros } from '../../Navegacion/Stack-Navegacion';

export const InicioPantalla = () => {
  const navegacion = useNavigation<NavigationProp<RootStackParametros>>();
  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['Producto', 'Infinito'],
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    queryFn: async params => {
      const productos = await BuscarProdutoPaginado(params.pageParam);
      return productos;
    },
    getNextPageParam: (ultimaPagina, todasPagina) => todasPagina.length,
  });
  return (
    <>
      <LayoutPrincipal
        Titulo="AndyMShop-Productos"
        SubTitulo="Aplicacion Administrativa">
        {isLoading ? (
          <CargandoPantallaCompleta />
        ) : (
          <ListadoProductos
            productos={data?.pages.flat() ?? []}
            BuscarSiguientePagina={() => fetchNextPage()}
          />
        )}
      </LayoutPrincipal>
      <FAB 
      icono='plus'
      estilo={{
        position:"absolute",
        bottom:20,
        right:20
      }}
      onPress={()=> navegacion.navigate("ProductosPantalla",{productoId: "Nuevo"})}
       />
    </>
  );
};
