import { useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput, Alert} from "react-native";

export default function practica(){
    const bienvenida = () => {
        Alert.alert ('bienvenido');
    };
    const [nombre, setNombre] = useState('');

    return(
        <View>
        <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        /> 
        <View>
            <Pressable
            onPress={() => {nombre} }>
                <Text>Presioname</Text>
            </Pressable>
        </View>
    </View>
    );
}