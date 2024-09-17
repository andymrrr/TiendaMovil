import React, { useState } from 'react'
import { Producto } from '../../../Dominios/Entidad/Producto'
import { Layout, List } from '@ui-kitten/components'
import { TarjetaProducto } from './Tarjeta-Producto'
import { RefreshControl } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
interface Propiedad{
    productos: Producto[];
    BuscarSiguientePagina :() => void;
}
const ListadoProductos = ({productos, BuscarSiguientePagina}: Propiedad) => {
    const [refrescar, setRefrescar] = useState(false)
    const consultaCliente = useQueryClient();
    const onTirarRefrescar = async()=>{
        setRefrescar(true)
            await new Promise(resuelve => setTimeout(resuelve,1500))
            consultaCliente.invalidateQueries({
                queryKey:["Producto","Infinito"]
              })
        setRefrescar(false)
    }
  return (
    
      <List
        data={productos}
        numColumns={2}
        keyExtractor={(item,index)=> `${item.id}-${index}`}

        renderItem={({item}) => (
            <TarjetaProducto producto={item}/>
        )}
        ListFooterComponent={()=> <Layout style={{height:150}}/>}
        onEndReached={()=> BuscarSiguientePagina()}
        onEndReachedThreshold={0.8}

        refreshControl={
            <RefreshControl
            refreshing={refrescar}
            onRefresh={()=> onTirarRefrescar()}
            />
        }
      />
      
   
  )
}

export default ListadoProductos