//* 1. Zona importaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, } from 'react-native';
import { Perfil } from '../componentts/Perfil';
//*2. Zona Render o Main

export default function TarjetasScreen() {
  return (
    <View style={styles.container}>
     {/*  <Text>Hola mundo rect native</Text>
      <Image source={require('./assets/wave.png')}></Image>
      <Text>----------------------------------</Text>
      <Saludo></Saludo>
      <Text>----------------------------------</Text>
      <Saludo2></Saludo2>
      <Text>----------------------------------</Text> */}

      <Perfil nombre="alvaro" carrera={"Tiid"} materia={"Movil"} cuatri={"4"} style={styles.tarjeta1}> </Perfil>

      <Perfil nombre="david" carrera={"Tiid"} materia={"Movil"} cuatri={"4"} style={styles.tarjeta2}></Perfil>

      <Perfil nombre="agua" carrera={"Tiid"} materia={"Movil"} cuatri={"4"} style={styles.tarjeta3}></Perfil>

      <StatusBar style="auto" />
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
  tarjeta1:{backgroundColor: 'pink'},
  tarjeta2:{backgroundColor: 'yellow'},
  tarjeta3:{backgroundColor: 'orange'}
});