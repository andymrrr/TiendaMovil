import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export class CamaraAdaptador {
  static async TomarFoto(): Promise<string[]> {
    try {
      const respuesta = await launchCamera({
        mediaType: 'photo',
        quality: 0.7,
        cameraType: 'back',
      });

      if (respuesta.assets && respuesta.assets[0].uri) {
        return [respuesta.assets[0].uri];
      }

      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static async BuscarFotoGaleria(): Promise<string[]> {
    try {
      const respuesta = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.7,
        selectionLimit:10
      });

      if (respuesta.assets && respuesta.assets.length > 0) {
        return respuesta.assets.map(imagen=> imagen.uri!);
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
