/**1. zona de importaciones/ */
import { useState } from 'react';
import { StatusBar, View, Text, StyleSheet } from 'react-native';
import { FlatList, SectionList, TouchableOpacity, SafeAreaView } from 'react-native';
/*
2.zona Render o Main
*/
export default function FlatListScreen() {
  const [vistaActual, setVistaActual] = useState('flat');
  const [serviciosFlat] = useState([
    {id: '1', titulo: 'Clase de ingles', categoria: 'Educación'},
    {id: '2', titulo: 'Reparacion de PC', categoria: 'Tecnologia'},
  ]);
  const [secciones] = useState([
    {title: 'Educación', data: ['Clase de ingles', 'Asesorias de matemáticas']},
    {title: 'Tecnología', data: ['Reparacion de PC', 'Redes']},
  ]);

    return (
    <SafeAreaView>
    <View style={styles.nav}>
      <TouchableOpacity style = {styles.btn} onPress={()=> setVistaActual('flat')}>
        <Text style={styles.txt}>FlatList</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.btn} onPress={()=> setVistaActual('section')}>
        <Text style={styles.txt}>SectionList</Text>
      </TouchableOpacity>
    </View>

    {vistaActual=== 'flat' ?(
      <View style={styles.content}>
        <Text style={styles.sub}>FlatList</Text>
        <FlatList data={serviciosFlat} keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text>{item.titulo} ({item.categoria})</Text>
          </View>
        )}>
          </FlatList>
      </View>

    ) : (
      <View style={styles.content}>
        <Text style={styles.sub}>SectionList</Text>
        <SectionList
          sections={secciones}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <View style={styles.card}>
            <Text>{item}</Text>
            </View>
      )}
      renderSectionHeader={({ section: {title }}) => (
          <Text style={styles.header}>{title}</Text>
      )}>
      </SectionList>
      </View>
    )
    }
    </SafeAreaView>
  );
}
/**3. zona de estilos/ */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  nav: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15 },
  btn: { backgroundColor: '#2563eb', padding: 8, marginHorizontal: 5, borderRadius: 4 },
  content: { flex: 1 },
  sub: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  card: { backgroundColor: '#f8fafc', padding: 10, marginVertical: 3, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 4 },
  header: { fontSize: 15, fontWeight: 'bold', backgroundColor: '#e2e8f0', padding: 6, marginTop: 8 },
  txt: { color: '#fff', fontWeight: 'bold' }
});