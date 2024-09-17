import { TiendaApi } from '../../Config/Api/TiendaApi';
import { RespuestaProducto } from '../../Infraestructura/Interfaces/Producto.Respuesta';
import { ProductoMapeo } from '../../Infraestructura/Mapeo/Producto.Mapeo';
import type{ Producto } from '../../Dominios/Entidad/Producto';

export const BuscarProdutoPaginado = async(pagina: number, limite: number =20) : Promise<Producto[]> => {
    try {
        console.log(`Pagina: ${pagina}, Limite: ${limite}`);
        pagina = pagina *10;
        const {data} = await TiendaApi.get<RespuestaProducto[]>(`/products?limit=${limite}&offset=${pagina}`)

        const productos = data.map(producto => ProductoMapeo.MapearRespuestaProductoAProducto(producto))
        
        return productos;
    } catch (error) {
        console.log(error)
        throw new Error(`Error al Listar Productos`)
    }
}

