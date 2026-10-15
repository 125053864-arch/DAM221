import{Text,Image, Button, View} from 'react-native'

export const Saludo2=()=>{
    return(
        
        <view> 
        <Text> Hola RN: soy un componente Compuesto</Text>
        <Image> source={require('..assets/wave.png')}</Image>
        <button title= "preciona para saludar"></button>



        </view>

    

    )
}

