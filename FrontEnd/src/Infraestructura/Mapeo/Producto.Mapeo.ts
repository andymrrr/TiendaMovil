import { Api } from '../../Config/Api/TiendaApi';
import type {Producto} from '../../Dominios/Entidad/Producto';
import type {RespuestaProducto} from '../Interfaces/Producto.Respuesta';

export class ProductoMapeo {
  static MapearRespuestaProductoAProducto(
    Respuesta: RespuestaProducto,
  ): Producto {
    return {
      id: Respuesta.id,
      description: Respuesta.description,
      gender: Respuesta.gender,
      price: Respuesta.price,
      sizes: Respuesta.sizes,
      slug: Respuesta.slug,
      stock: Respuesta.stock,
      tags: Respuesta.tags,
      title: Respuesta.title,
      images: Respuesta.images.map(
        imagen => `${Api}/files/product/${imagen}`
      )
    };
  }
}
