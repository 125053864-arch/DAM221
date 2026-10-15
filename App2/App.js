
//* 1. Zona importaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Saludo} from './componentts/Saludo';
import {Saludo2} from './componentts/Saludo2'; 
import { Perfil } from './componentts/Perfil';
//*2. Zona Render o Main

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola mundo rect native</Text>
      <Image source={require('./assets/wave.png')}></Image>
      <Text>----------------------------------</Text>
      <Saludo></Saludo>
      <Text>----------------------------------</Text>
      <Saludo2></Saludo2>
      <Text>----------------------------------</Text>
      <Perfil></Perfil>

      <StatusBar style="auto" />
    </View>
  );
}
//*.3 Zona estilos y posicionamientos

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
