import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Touchable, TextInput, AsyncStorageStatic, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';

export default function App() {

  const [estado, setarEstado] = useState('leitura');
  const [anotacao, setarAnotacao] = useState('');

  useEffect(() => {
    // quando abrir o app novamente irá ler a key anotacao

    (async () => {
      try{
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
        setarAnotacao(anotacaoLeitura);
      }
      catch(error){}
    })
  },[])

  setData = async() => {
    try{
      await AsyncStorage.setItem('anotacao', anotacao);
    }
    catch(error){

    }
    alert('Sua anotação foi salva')
  }

  function atualizarTexto(){
    setarEstado('leitura');
    setData();
  }

  if(estado == 'leitura'){
    return (
      <View style={{marginTop:Constants.statusBarHeight, flex:1}}>
        <View style={styles.header}>
          <Text style={styles.textoHeader}>Aplicativo Anotação</Text>
        </View>
        { // isso é um if
          (anotacao != '')?
          <View style={{padding:20}}>
          <Text style={styles.anotacao}>{anotacao}</Text>
          </View>
          :
          <View style={{padding:20}}>
          <Text style={styles.anotacao} style={{opacity:0.4}}>Nenhuma anotação encontrada :(</Text>
          </View>
        }
        
        <TouchableOpacity onPress={() => setarEstado('atualizando')} style={styles.btnAnotacao}>
          {
            (anotacao != '')?
            <Text style={styles.btnAnotacaoTexto}> + </Text>
            :
            <Text style={{fontSize:14, color:'white', textAlign:'center', marginTop:15}}> Editar </Text>
          }
          
        </TouchableOpacity>
      </View>
    );
  }
  else if(estado == 'atualizando'){
    return (
      <View style={{marginTop:Constants.statusBarHeight, flex:1}}>
        <View style={styles.header}>
          <Text style={styles.textoHeader}>Aplicativo Anotação</Text>
        </View>

        <TextInput autoFocus={true} onChangeText={(text) => setarAnotacao(text)} style={{padding:20, height:300, textAlignVertical:"top"}} multiline={true} numberOfLines={5} value={anotacao}></TextInput>

        <TouchableOpacity onPress={() => atualizarTexto()} style={styles.btnSalvar}><Text style={styles.btnTextoSalvar}> Salvar </Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    padding:10, 
    width:"100%",
    backgroundColor:"#069"
  },

  textoHeader:{ textAlign:"center", color:"white", fontSize:20 },

  anotacao:{ fontSize:16 },

  btnAnotacao:{
    position:"absolute",
    right:20,
    bottom:20,
    height:50,
    width:50,
    borderRadius:25,
    backgroundColor:"#069"
  },

  btnAnotacaoTexto:{
    color:"white",
    position:"relative",
    textAlign:"center",
    top:3,
    fontSize:30
  },

  btnSalvar:{
    position:"absolute",
    right:20,
    bottom:20,
    paddingBottom:10,
    paddingTop:10,
    width:100,
    backgroundColor:"#069"
  },

  btnTextoSalvar:{
    color:"white",
    position:"relative",
    textAlign:"center",
    fontSize:20
  }
})

