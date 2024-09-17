import {isAxiosError} from 'axios';
import {TiendaApi} from '../../Config/Api/TiendaApi';
import {Producto} from '../../Dominios/Entidad/Producto';

export const CrearActualizarProducto = (producto: Partial<Producto>) => {
  producto.stock = isNaN(Number(producto.stock)) ? 0 : Number(producto.stock);
  producto.price = isNaN(Number(producto.price)) ? 0 : Number(producto.price);

  if (producto.id && producto.id !== 'Nuevo') {
    return ActualizarProducto(producto);
  }

  return CrearProducto(producto);
};

const ActualizarProducto = async (producto: Partial<Producto>) => {
  const {id, images = [], ...resto} = producto;
  try {
    const imageRevisada = await prepararImagenes(images);

    const {data} = await TiendaApi.patch(`/products/${id}`, {
      images: imageRevisada,
      ...resto,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
    console.log(error);
    throw new Error(`Ha ocurrido un error al actualizar el Producto ${id}`);
  }
};

const CrearProducto = async (producto: Partial<Producto>) => {
  const {id, images = [], ...resto} = producto;
  try {
    const imageRevisada = await prepararImagenes(images);
    console.log({imageRevisada});

    const {data} = await TiendaApi.post(`/products/`, {
      images: imageRevisada,
      ...resto,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
    console.log(error);
    throw new Error(`Ha ocurrido un error al actualizar el Producto ${id}`);
  }
};

const prepararImagenes = async(imagenes: string[]) => {
  const imagenArchivo =imagenes.filter(imagen => imagen.includes("files://"))
  const imagenActual =  imagenes.filter(imagen => !imagen.includes("files://"))
  if(imagenArchivo.length > 0)
  {
    const subirPromesa = imagenArchivo.map(imagen => SubirImagen(imagen))
    const subirImagenes = await  Promise.all(subirPromesa)
    imagenActual.push(...subirImagenes)
  }

  const imagenCortada = imagenActual.map(imagen => imagen.split('/').pop());
  return imagenCortada;
};


const SubirImagen = async(imagen : string)=> {
  const  formData = new FormData()
  try {
    formData.append("file",{
      uri:imagen,
      type: "image/jpeg",
      name: imagen.split('/').pop()
    })
  
    const {data} = await TiendaApi.post<{image: string}>(`/files/products`,formData,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })

    return  data.image
  } catch (error) {
    console.log(error)
    throw new Error(`Revisa el Log`)
  }

}