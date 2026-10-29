
import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Switch } from 'react-native';

export default function PressableScreen() {
    const [mensaje, setMensaje] = useState('Presiona el boton');
    const [activado, setActivado] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Pressable</Text>

            <Text>{mensaje}</Text>

            <Pressable
                onPress={() => setMensaje('Boton Presionado')}
                onPressIn={() => console.log('Inicio de pulsacion')}
                onPressOut={() => console.log('Fin de pulsacion')}
                onLongPress={() => console.log('Pulsacion larga')}
                style={({ pressed }) => [
                    styles.boton,
                    pressed && styles.botonPresionado
                ]}
            >
                <Text style={styles.textoBoton}>Presioname</Text>
            </Pressable>

            <View style={styles.separador} />

            <Text style={styles.titulo}>Switch</Text>

            <Text>
                Estado: {activado ? 'Activado' : 'Desactivado'}
            </Text>

            <Switch
                value={activado}
                onValueChange={setActivado}
                disabled={false}
                trackColor={{
                    false: 'rgb(15, 15, 81)',
                    true: '#cf2e2e'
                }}
                thumbColor={
                    activado ? '#00d' : 'rgb(138, 138, 198)'
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    boton: {
        backgroundColor: '#319b80',
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
    },
    botonPresionado: {
        backgroundColor: '#1e6655',
    },
    textoBoton: {
        color: 'white',
        fontSize: 16,
    },
    separador: {
        height: 2,
        backgroundColor: '#cccccc',
        width: '90%',
        marginVertical: 35,
    },
});

