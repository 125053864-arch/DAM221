
import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabsLayout(){
    return(
        <Tabs>
            <Tabs.Screen
              name="index"
              options={{title:"Inicio",href:null}}
            />

            <Tabs.Screen
              name="alta"
              options={{title:"Formulario",
                        tabBarIcon:({color, size}) => (
                            <Ionicons name="person-add" size={15} color={"red"}/>
                        )
              }}
            />

            <Tabs.Screen
              name="consulta"
              options={{title:"Listado",
                        tabBarIcon:({color, size}) => (
                            <FontAwesome6 name="clipboard-list" size={24} color="black" />
                        )
              }}
            />
        </Tabs>
    );
}

