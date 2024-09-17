import React, {useRef} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParametros} from '../../Navegacion/Stack-Navegacion';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {LayoutPrincipal} from '../../Layout/Layout-Principal';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import { ScrollView} from 'react-native';
import {sizes} from '../../../Dominios/Constante/Size';
import {Generos} from '../../../Dominios/Constante/Generos';
import {Icono} from '../../Componente/Ui/Icono';
import {Formik} from 'formik';
import {Producto} from '../../../Dominios/Entidad/Producto';
import { ImagenesProductos } from '../../Componente/Productos/Imagene-Productos';
import { BuscarProductoId, CrearActualizarProducto } from '../../../Acciones/Productos';
import { CamaraAdaptador } from '../../../Config/Adaptador/Camara.Adaptador';

interface Propiedad
  extends StackScreenProps<RootStackParametros, 'ProductosPantalla'> {}
export const ProductosPantalla = ({route, navigation}: Propiedad) => {
  const productoId = useRef(route.params.productoId);
  const tema = useTheme();

  const consultaCliente = useQueryClient();
  const {data: producto} = useQuery({
    queryKey: ['Producto', productoId.current],
    staleTime: 60 * 60 * 100,
    queryFn: () => BuscarProductoId(productoId.current),
  });

  const {mutate, isPending} = useMutation({
    mutationFn: (data: Producto) =>
      CrearActualizarProducto({...data, id: productoId.current}),
    onSuccess(data: Producto) {
      productoId.current = data.id;
      consultaCliente.invalidateQueries({
        queryKey: ['Producto', 'Infinito'],
      });
      consultaCliente.invalidateQueries({
        queryKey: ['Producto', data.id],
      });
      console.log('Completado');
    },
  });

 
  if (!producto) {
    return <LayoutPrincipal Titulo="Cargando..." />;
  }
  return (
    <Formik initialValues={producto} onSubmit={values => mutate(values)}>
      {({handleChange, handleSubmit, values, setFieldValue}) => (
        <LayoutPrincipal
          Titulo={values.title}
          SubTitulo={`Precio: ${values.price}`}
          AccionDerecha={ async()=>{
             const foto = await CamaraAdaptador.BuscarFotoGaleria()
             console.log(foto);
             
             if(foto.length > 0)
             {
              setFieldValue('images', [...values.images, ...foto])

             }
          }}
          AccionDerechaIcono='camera-outline'
          >
          <ScrollView style={{flex: 1}}>
            {/*Imgenes del Producto*/}
            <Layout
              style={{
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImagenesProductos imagenes={values.images}/>
            </Layout>

            {/*Foromulario*/}
            <Layout style={{marginHorizontal: 10}}>
              <Input
                label="Titulo"
                value={values.title}
                onChangeText={handleChange('title')}
                style={{marginVertical: 5}}
              />
              <Input
                label="Slug"
                value={values.slug}
                onChangeText={handleChange('slug')}
                style={{marginVertical: 5}}
              />
              <Input
                label="Descripcion"
                multiline
                numberOfLines={5}
                value={values.description}
                onChangeText={handleChange('description')}
                style={{marginVertical: 5}}
              />
            </Layout>
            {/*Precio e inventario*/}
            <Layout
              style={{
                marginVertical: 5,
                flexDirection: 'row',
                marginHorizontal: 15,
                gap: 10,
              }}>
              <Input
                label="Precio"
                value={values.price.toString()}
                onChangeText={handleChange('price')}
                style={{flex: 1}}
                keyboardType="numeric"
              />
              <Input
                label="Inventario"
                value={values.stock.toString()}
                onChangeText={handleChange('stock')}
                style={{flex: 1}}
                keyboardType="numeric"
              />
            </Layout>
            {/*Selectores*/}
            <ButtonGroup
              style={{margin: 2, marginTop: 20, marginHorizontal: 15}}
              size="small"
              appearance="outline">
              {sizes.map(size => (
                <Button
                  key={size}
                  onPress={() =>
                    setFieldValue(
                      'sizes',
                      values.sizes.includes(size)
                        ? values.sizes.filter(s => s !== size)
                        : [...values.sizes, size],
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor: values.sizes.includes(size)
                      ? tema['color-primary-200']
                      : undefined,
                  }}>
                  {size}
                </Button>
              ))}
            </ButtonGroup>
            <ButtonGroup
              style={{margin: 2, marginTop: 20, marginHorizontal: 15}}
              size="small"
              appearance="outline">
              {Generos.map(gender => (
                <Button
                  key={gender}
                  onPress={() => setFieldValue('gender', gender)}
                  style={{
                    flex: 1,
                    backgroundColor: values.gender.startsWith(gender)
                      ? tema['color-primary-200']
                      : undefined,
                  }}>
                  {gender}
                </Button>
              ))}
            </ButtonGroup>

            <Button
              style={{margin: 15}}
              onPress={() => handleSubmit()}
              disabled={isPending}
              accessoryLeft={<Icono nombre="save-outline" blanco />}>
              Guardar
            </Button>
            <Layout style={{height: 200}} />
          </ScrollView>
        </LayoutPrincipal>
      )}
    </Formik>
  );
};
