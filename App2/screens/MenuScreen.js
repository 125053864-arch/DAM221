
//* 1. Zona importaciones
import { StyleSheet, View, Text, Button } from 'react-native';
import {useState } from 'react';
import TarjetasScren from './TarjetasScreen';
import SafesScreen from './SafesScreen';
import Activity  from './Activity';
import Pressable from './Pressable';
import Modal from './Modal';
import Textitput from './Textitput';
import Flatlist from './FlatList';
import imageBack from './imageBack';
//*2. Zona Render o Main

export default function MenuScreen() {
    const [screen,setScreen] = useState('menu');

    switch(screen){
        case 'tarjetas':
            return<TarjetasScren/>;
        case 'safe':
            return <SafesScreen/>;
        case 'Activity':
            return <Activity/>;
        case 'Modal':
            return <Modal/>;
        case "pressa":
            return <Pressable/>;
        case 'image':
            return <imageBack/>;
        case 'Text':
            return <Textitput/>;
        case 'flast':
          return <Flatlist/>
        case 'menu':
            default: 
              return (
                <View style={styles.container}>

                    <Text> Menu de practicas </Text>
                    <Button title='pract:Tarjetas' onPress={ ()=>setScreen('tarjetas')}></Button>
                    <Button title='pract:SafeAreaView' onPress={ ()=>setScreen('safe')}></Button>
                    <Button title='pract:Pressable' onPress={ ()=>setScreen('pressa')}></Button>
                    <Button title='pract:Textitput' onPress={ ()=>setScreen('Text')}></Button>
                    <Button title='pract:FlatList' onPress={ ()=>setScreen('flast')}></Button>
                    <Button title='pract:imageBack' onPress={ ()=>setScreen('image')}></Button>
                    <Button title='pract:Modal' onPress={ ()=>setScreen('Modal')}></Button>
                    <Button title='pract:Activity' onPress={ ()=>setScreen('Activity')}></Button>
                </View>
  );
} //switch
} //funcion  
//*.3 Zona estilos y posicionamientos

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    
  },
});