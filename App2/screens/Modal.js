
import React, {useState, useRef, useMemo, useCallback} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {View, Text, Modal, TextInput, Pressable, StyleSheet, StatusBar, flatlist, FlatList} from 'react-native'
import bottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';



export default function modal(){
    const [ modalvisible, setMOdalvisible] = useState(false);
    const [ task, srTask] = useState('');
    const [ tasks, setTasks] = useState([]);
    const [ priority, setPriority] = useState('Media');

    const bottomsheetRef = useRef(null);
    const nextTaskid = useRef(0);
    const snapPoints = useMemo(() => ['35%', '55%' ], []);

    const openBottomSheet = useCallback(() =>{
        bottomsheetRef.current?.snaptoindex(0);

    }, []);


    const saveTask = () => {
        const taskName = task.trim();
        if(taskName === ''){
            return;
        }

        setTasks((currentTasks) => [
            ...currentTasks, 
            {
                id: nextTaskid.current++,
                name: taskName,
                priority
            }

        ]);
        setTasks('');
        setMOdalvisible(false);
    };

    const selectpriority = (selectpriority) => {
        setPriority(selectpriority);
        bottomsheetRef.current?.close();
    }

    return(
        <GestureHandlerRootView style={StyleSheet.root}>
            <StatusBar barStyle='dark-content'/>
            <View style={StyleSheet.container}>
                <Text style={StyleSheet.title}>Organiza tus tareas</Text>
                <Text style={StyleSheet.title}>Crea una nueva tarea</Text>

                <Pressable style={StyleSheet.primaryButton} onPress={() => {openBottomSheet}}>
                    <Text style={StyleSheet.buttonText}>+nueva tarea</Text>
                </Pressable>

                <Pressable style={StyleSheet.secondaryButton} onPress={() => {openBottomSheet}}>
                    <Text style={StyleSheet.buttonText}>Seleccionaar prioridad</Text>
                </Pressable>

                <FlatList style={StyleSheet.taskList}
                contentContainerStyle={StyleSheet.tasksListContaent}
                renderItem={({item, index}) => (
                    <View style={styles.taskCard}>
                         <Text style={styles.cardTitle}>tarea {index + 1}</Text>
                         <Text style={styles.taskText}>{item.name}</Text>
                         <Text style={styles.priorityText}>Prioridad: {item.priority}</Text>
                    </View>
                )}
                />
            </View>

            <Modal vidible={ modalVidible} animationType='slide'
            transparent onRequestClose={()  => setMOdalvisible(false)}>
                <View style= {styles.modalCard}>
                    <Text style={styles.modalTitle}>Nueva tarea</Text>
                    <Text style={styles.description}>Escribe el nombre de la actividad</Text>
                    <TextInput
                    style={styles.input}
                    placeholder= 'Ej. Estudiar React Native'
                    value={task}/>

                    <Pressable style={styles.primaryButton} onPress={() => {saveTask}}>
                        <Text style={styles.buttonText}>Guardar Tarea</Text>
                    </Pressable>

                    <Pressable style={styles.cancelButton} onPress={() => {setMOdalvisible(false)}}>
                        <Text style={styles.cancelText}>Cancelar</Text>
                    </Pressable>

                </View>
            </Modal>

            <BottoomSheet
            ref={bottomsheetRef}
            enablePanDownToClose
            backgroundStyles={styles.sheetBackGroound}
            handleIndicatorStyle={styles.handleIndicator}>
                <BottomSheetView style={styles.sheetContent}>
                    <Text style={styles.sheetTitle}>Selecciona la prioridad</Text>
                    <Text style={styles.description}>Elige la importancia de tu tarea</Text>
                    {['Baja', 'Mediana', 'Alta'].map((item) => {
                        return (
                            <Pressable
                            key={item}
                            style={[styles.priorityOption, priotity === item && styles. selectedOption]}
                            onPress={() => selectedPriority(item)}
                            >
                                <Text style={[styles.priotityText, priority === item && styles.selectedText]}>
                                {item}
                                </Text>
                            </Pressable>
                        );
                    })
                    }
                </BottomSheetView>
            </BottoomSheet>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    root: {flex: 1},
    container:{
        flex: 1,
        backgroundColor: '#F4F5FB',
        padding: 24,
        paddingTop: 70
    },
    title:{
        fontSize: 32,
        fontWeight: 'bold',
        color: '#5144D8',
        textAlign: 'center'
    },
    subtitle:{
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 32,
    },
    primaryButton:{
        backgroundColor: '#5B4AE8',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 24
    },
    secondaryButton:{
        backgroundColor: '#292640',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 24
    },
    buttonText:{
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    taskCard:{
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 16,
        elevation: 3,
        marginBottom: 12
    },
    tasksList:{flex: 1},
    tasksListContent:{paddingBottom: 12},
    cardTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12
    },
    taskText:{
        fontSize: 16,
        color: '#333',
        marginBottom: 12
    },
    priorityText:{
        fontSize: 15,
        color: '#555'
    },
    modalBackground:{
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: 'rgba(0,0,0,0.45)'
    },
    modalCard:{
        backgroundColor: '#FFF',
        padding: 24,
        borderRadius: 20
    },
    modalTitle:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5144D8',
        marginBottom: 10
    },
    description:{
        fontSize: 14,
        color: '#777',
        marginBottom: 18
    },
    input:{
        borderWidth: 1,
        borderColor: '#D8D5EA',
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        marginBottom: 20
    },
    cancelButton:{
        padding: 12,
        alignItems: 'center'
    },
    cancelText:{
        color: '#5144D8',
        fontWeight: 'bold'
    },
    sheetBackground:{
        backgroundColor: '#FFF'
    },
    handleIndicator:{
        backgroundColor: '#C8C7D2',
        width: 42
    },
    sheetContent:{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 12
    },
    sheetTitle:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#292640',
        marginBottom: 8
    },
    priorityOption:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E3F0',
        borderRadius: 12,
        marginBottom: 10
    },
    selectedOption:{
        backgroundColor: '#EFEDFF',
        borderColor: '#5B4AE8'
    },
    selectedText:{
        color: '#5144D8',
        fontWeight: 'bold'
    }
});