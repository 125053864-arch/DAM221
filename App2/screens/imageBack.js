// 1. Importaciones
import { useState, useEffect } from 'react';
import {View, Text, ImageBackground, Pressable, StyleSheet} from 'react-native';


export default function ImageBack() {

  const [noche, setNoche] = useState(false);

 
  const [cargando, setCargando] = useState(true);

 
  useEffect(() => {
    const temporizador = setTimeout(() => {
      setCargando(false);
    }, 2000);

    return () => clearTimeout(temporizador);
  }, []);

 
  if (cargando) {
    return (
      <View style={styles.splash}>
        <Text style={styles.splashTitle}>
          Bienvenido
        </Text>

        <Text style={styles.splashDescription}>
          Mi Aplicación
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={
        noche
          ? require('../assets/noche.jpg')
          : require('../assets/dia.jpg')
      }
      style={styles.background}
      resizeMode="cover"
    >

      <View style={styles.overlay}>

        <Text style={styles.title}>
          Ejemplo de Background
        </Text>

        <Text style={styles.description}>
          {noche
            ? 'Actualmente es de noche'
            : 'Actualmente es de día'}
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => setNoche(!noche)}
        >
          <Text style={styles.buttonText}>
            {noche ? 'Cambiar a día' : 'Cambiar a noche'}
          </Text>
        </Pressable>

      </View>

    </ImageBackground>
  );
}

// 3. Estilos
const styles = StyleSheet.create({

  splash: {
    flex: 1,
    width: '100%',
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },

  splashTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },

  splashDescription: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 10,
  },

  background: {
    flex: 1,
    width: '100%',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 20,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  description: {
    color: '#FFFFFF',
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

});