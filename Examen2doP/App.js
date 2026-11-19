
// Importacion

import React, { useState } from 'react';

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Switch,
  TextInput,
  Alert,
  FlatList,
  SectionList,
  ImageBackground,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';


// MAIN

export default function App() {

  const [activo, setActivo] = useState(false);
  const [nombre, setNombre] = useState('');
  const [modal, setModal] = useState(false);
  const [bottom, setBottom] = useState(false);

  const alumnos = [
    { id: '1', nombre: 'Alvaro' },
    { id: '2', nombre: 'Carlos' },
    { id: '3', nombre: 'Maria' }
  ];

  const grupos = [
    {
      title: 'Grupo A',
      data: ['Alvaro', 'Carlos']
    },
    {
      title: 'Grupo B',
      data: ['Maria', 'Daniel']
    }
  ];

  return (

    <SafeAreaView style={styles.contenedor}>

      <ScrollView>

        <Text style={styles.titulo}>REPASO REACT NATIVE</Text>


        {/* SafeAreaView */}

        <View style={styles.caja}>
          <Text>SafeAreaView</Text>
          <Text>Protege el contenido de la pantalla.</Text>
        </View>


        {/* ScrollView */}

        <View style={styles.caja}>
          <Text>ScrollView</Text>
          <Text>Permite desplazarse por la pantalla.</Text>
        </View>


        {/* Pressable */}

        <View style={styles.caja}>
          <Text>Pressable</Text>

          <Pressable
            style={styles.boton}
            onPress={() => Alert.alert('Hola', 'Presionaste el boton')}
          >
            <Text style={styles.textoBoton}>Presioname</Text>
          </Pressable>
        </View>


        {/* Switch */}

        <View style={styles.caja}>
          <Text>Switch</Text>

          <Switch
            value={activo}
            onValueChange={setActivo}
          />

          <Text>{activo ? 'Activado' : 'Desactivado'}</Text>
        </View>


        {/* TextInput */}

        <View style={styles.caja}>
          <Text>TextInput</Text>

          <TextInput
            style={styles.input}
            placeholder="Escribe tu nombre"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>


        {/* Alert */}

        <View style={styles.caja}>
          <Text>Alert</Text>

          <Pressable
            style={styles.boton}
            onPress={() => Alert.alert('Aviso', 'Hola Alvaro')}
          >
            <Text style={styles.textoBoton}>Mostrar alerta</Text>
          </Pressable>
        </View>


        {/* FlatList */}

        <View style={styles.caja}>
          <Text>FlatList</Text>

          <FlatList
            data={alumnos}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text>{item.nombre}</Text>
            )}
          />
        </View>


        {/* SectionList */}

        <View style={styles.caja}>
          <Text>SectionList</Text>

          <SectionList
            sections={grupos}
            scrollEnabled={false}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <Text>{item}</Text>
            )}
            renderSectionHeader={({ section }) => (
              <Text style={styles.subtitulo}>{section.title}</Text>
            )}
          />
        </View>


        {/* ImageBackground */}

        <View style={styles.caja}>
          <Text>ImageBackground</Text>

          <ImageBackground
            source={{ uri: 'https://picsum.photos/500/200' }}
            style={styles.fondo}
          >
            <Text style={styles.textoFondo}>Hola mundo</Text>
          </ImageBackground>
        </View>


        {/* SplashScreen */}

        <View style={styles.caja}>
          <Text>SplashScreen</Text>
          <Text>Controla la pantalla inicial de la aplicacion.</Text>
        </View>


        {/* Modal */}

        <View style={styles.caja}>
          <Text>Modal</Text>

          <Pressable
            style={styles.boton}
            onPress={() => setModal(true)}
          >
            <Text style={styles.textoBoton}>Abrir Modal</Text>
          </Pressable>

          <Modal visible={modal} animationType="slide">
            <View style={styles.modal}>
              <Text>Hola, soy un Modal</Text>

              <Pressable
                style={styles.boton}
                onPress={() => setModal(false)}
              >
                <Text style={styles.textoBoton}>Cerrar</Text>
              </Pressable>
            </View>
          </Modal>
        </View>


        {/* Bottom Sheet */}

        <View style={styles.caja}>
          <Text>Bottom Sheet</Text>

          <Pressable
            style={styles.boton}
            onPress={() => setBottom(true)}
          >
            <Text style={styles.textoBoton}>Abrir Bottom Sheet</Text>
          </Pressable>

          <Modal
            visible={bottom}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.fondoModal}>
              <View style={styles.bottom}>
                <Text>Hola, soy un Bottom Sheet</Text>

                <Pressable
                  style={styles.boton}
                  onPress={() => setBottom(false)}
                >
                  <Text style={styles.textoBoton}>Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>


        {/* ActivityIndicator */}

        <View style={styles.caja}>
          <Text>ActivityIndicator</Text>

          <ActivityIndicator size="large" color="blue" />
        </View>


        {/* KeyboardAvoidingView */}

        <View style={styles.caja}>
          <Text>KeyboardAvoidingView</Text>

          <KeyboardAvoidingView behavior="padding">
            <TextInput
              style={styles.input}
              placeholder="Escribe algo"
            />
          </KeyboardAvoidingView>
        </View>


      </ScrollView>

    </SafeAreaView>
  );
}


// ESTILOS

const styles = StyleSheet.create({

  contenedor: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },

  titulo: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 20
  },

  subtitulo: {
    fontWeight: 'bold',
    marginTop: 8
  },

  caja: {
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 10
  },

  boton: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 10,
    borderRadius: 5
  },

  textoBoton: {
    color: 'white',
    textAlign: 'center'
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 10
  },

  fondo: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },

  textoFondo: {
    color: 'white',
    fontSize: 25
  },

  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  fondoModal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000066'
  },

  bottom: {
    backgroundColor: 'white',
    padding: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  }

});