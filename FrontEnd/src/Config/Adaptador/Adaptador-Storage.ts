import AsyncStorage from "@react-native-async-storage/async-storage"

export class AdaptadorStorage {
    static async BuscarItem (llave: string): Promise<string | null>{
        try {
            const valor = await  AsyncStorage.getItem(llave);
            return valor;
        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async EstablecerElemento (llave: string, valor: string) : Promise<void>{
        try {
            await AsyncStorage.setItem(llave,valor);
        } catch (error) {
            throw new Error(`Error al Establecer Elemento: ${llave} ${valor}`)
        }
    }
    static async EliminarElemento (llave: string): Promise<void>  {
        try {
            await AsyncStorage.removeItem(llave)
        } catch (error) {
            throw new Error(`No se pudo Remover la: ${llave}`)
        }
    }
}