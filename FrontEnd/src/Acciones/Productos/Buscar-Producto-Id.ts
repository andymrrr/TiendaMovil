import { TiendaApi } from "../../Config/Api/TiendaApi";
import { Gender, Producto } from "../../Dominios/Entidad/Producto";
import { RespuestaProducto } from "../../Infraestructura/Interfaces/Producto.Respuesta";
import { ProductoMapeo } from "../../Infraestructura/Mapeo/Producto.Mapeo";

const NuevoProducto: Producto= {
    id:'',
    description:'',
    title:"Nuevo Producto",
    gender:Gender.Unisex,
    images:[],
    price:0,
    sizes:[],
    slug:'',
    stock:0,
    tags: []
}
export const BuscarProductoId = async(id: string) : Promise<Producto>=> {
    try {
        if(id=== "Nuevo")
        {
            return NuevoProducto;
        }
        const {data} = await TiendaApi.get<RespuestaProducto>(`/products/${id}`)

        const producto = ProductoMapeo.MapearRespuestaProductoAProducto(data);

        return producto;
    } catch (error) {
        console.log(error);
        throw new Error (`Error al Buscar el Producto: ${id}`)
        
    }
} 