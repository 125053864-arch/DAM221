
import {Stack} from 'expo-router';

export default function RootLayout(){
    return(
        <Stack>
            <Stack.Screen name="(tabs)"
            options={{headerShown:false}}/>

            <Stack.Screen name="detalle"
            options={{title: "Detalle del Usuario"}}></Stack.Screen>

            <Stack.Screen name="actualiza"
            options={{title: "Actualizar usuario"}}></Stack.Screen>

        </Stack>
    )
    
}   

