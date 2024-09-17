import {View, Text, Image, FlatList} from 'react-native';
import React from 'react';
import {FadeInImage} from '../Ui/FadeInImage';
interface Propiedad {
  imagenes: string[];
}
export const ImagenesProductos = ({imagenes}: Propiedad) => {
  return (
    <>
      {imagenes.length === 0 ? (
        <Image
          source={require('../../../assets/no-imagen.png')}
          style={{width: 300, height: 300}}
        />
      ) : (
        <FlatList
          data={imagenes}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <FadeInImage
              uri={item}
              style={{height: 300, width: 300, marginHorizontal: 7}}
            />
          )}
        />
      )}
    </>
  );
};
