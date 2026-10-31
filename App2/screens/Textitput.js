import { useState } from "react";
import { ScrollView,View, TextInput, Button, Alert, StyleSheet, Text  } from "react-native";

export default function TextInputScreen(){
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [password, setPassword] = useState('');
    const [comentario, setComentario]= useState('');

    const alertaSimple = () =>{
        Alert.alert('Hola', 'Esta es una alerta simple');""
    };

    const alertaDosBotones = () => {
        Alert.alert('Confirmar', 'Desea continuar?',[
            {text: 'Cancelar'},
            {text: 'Aceptar'},
        ]);
    };


    const mostrarNombre = ()=> {
        Alert.alert('Tu nombre', nombre === '' ? 'No escribiste nada' : nombre)
    };

    return(
        <ScrollView contarntContainerStyle = {styles.container}>
            <Text style={styles.titulo}> textInput y alert</Text>

            <Text style={styles.subtitulo}> TextInput basico</Text>

            <TextInput
            style={styles.input}
            placeholder='Escribe tu nombre'
            value={nombre}
            onChange={setNombre}
            />

            <Text style ={styles.subtitulo}>2.Teclado Numerico</Text>
            <TextInput
            style={styles.input}
            placeholder='Edad'
            keyboardType='numeric'
            maxLength={3}
            value={edad}
            onChangeText={setEdad}
            />

            <Text style={styles.subtitulo}>3. Contrasena (secureTextEntry)</Text>
            <TextInput
            style={styles.input}
            placeholder='Contrasena'
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            />

            <Text style={styles.subtitulo}>4. Varias lineas</Text>
            <TextInput
            style={[styles.input, styles.grande]}
            placeholder='Escribe un comentario'
            multiline={true}
            numberOfLines={4}
            value={comentario}
            onChangeText={setComentario}
            />

            <Text style={styles.subtitulo}>Ejemplos de Alert</Text>

            <View style={styles.boton}>
                <Button title="Alerta simple" onPress={alertaSimple}/>
            </View>

            <View style={styles.boton}>
                <Button title="Alarta con dos botones" onPress={alertaDosBotones}></Button>
            </View>

            <View style={styles.boton}>
                <Button title="Mostrar mi nombre" onPress={mostrarNombre}/>
            </View>

        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: { padding: 24, paddingTop: 60, backgroundColor: '#fff' },
    titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    subtitulo: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 6 },
    input: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 6,
        padding: 10,
        fontSize: 16,
    },
    grande: { height: 90, textAlignVertical: 'top' },
    boton: { marginBottom: 10 },
});

