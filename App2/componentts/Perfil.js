import { View } from 'react-native'
import{Text,Button,StyleSheet} from 'react-native'
import { useState } from 'react'

export const Perfil=({nombre,carrera,materia,cuatri,style})=>{

    const [mostrar,serMostrar] = useState(false);
    return(
        <View style={[estilos.terjetas, style]}> 
        <Text style={estilos.nombre}> {nombre}</Text>
        {mostrar && 
        <>
        <Text style={estilos.carrera }> {carrera}</Text>
        <Text style={estilos.otrotexto}> {materia} </Text>
        <Text style={estilos.otrotexto}> {cuatri}</Text>
        </>
        }
        <Button title='Ver Perfil' onPress={()=> serMostrar(!mostrar)}></Button>
        </View>
        

    )
}

const estilos = StyleSheet.create({
    nombre:{
        fontSize: 24,
        fontWeight:600,
        textTransform: 'uppercase',
    },

    carrera:{
        fontSize:20,
        color: 'red',
        fontFamily: 'Roboto',
    },

    otrotexto:{
        fontSize:18,
        color: 'blue',
        fontFamily: 'Courier',
        fontStyle:'italic'
    },

    terjetas:{
        borderWidth:3,
        borderRadius:10,
        padding:15,
        margin: 10,

    },
});