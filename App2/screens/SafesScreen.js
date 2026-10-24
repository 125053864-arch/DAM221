
//* 1. Zona importaciones
import { StyleSheet, View, Text, Button } from 'react-native';

//*2. Zona Render o Main

export default function SafesScreen() {
  return (
    <View style={styles.container}>

        <Text> Practica 10</Text>
        <Text> Saul o diego</Text>
 
    </View>
  );
}
//*.3 Zona estilos y posicionamientos

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    
  },
});