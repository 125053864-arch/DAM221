import { View } from 'react-native'
import{Text,Button} from 'react-native'
import { useState } from 'react'

export const Perfil=({nombre,carrera,materia,cuatri})=>{

    const [mostrar,serMostrar] = useState(false);
    return(
        <View> 
        <Text> {nombre}</Text>
        {mostrar && 
        <>
        <Text> {carrera}</Text>
        <Text> {materia} </Text>
        <Text> {cuatri}</Text>
        </>
        }
        <Button title='Ver Perfil' onPress={()=> serMostrar(!mostrar)}></Button>
        </View>
        

    )
}