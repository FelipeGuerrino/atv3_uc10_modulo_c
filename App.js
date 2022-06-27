

import React from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


import ListaTarefas from './src/Components/ListaTarefas';
import TarefasDataBase from './src/Database';
import Tarefas from './src/Models/Tarefas';


export default class App extends React.Component {              



  Conectar = () => {
    const banco = new TarefasDataBase();
    banco.Conectar();
    banco.Desconectar();
  }

  constructor(props) {
    super(props);
    this.state = {
      Descricao: "",
      DataTermino: "",
      Prioridade: "",
      Status: "",
      listaTarefas: [],
      date:"",
      month:"",
      year:"",
      dataAtual:""
      
    }
    this.ListarTarefas()
  }

  ListarTarefas = () => {
    const banco = new TarefasDataBase();
    banco.Listar().then(lista => { this.setState({ listaTarefas: lista }) })
  }

  CadastrarTarefa = (Descricao, DataTermino, Prioridade, Status) => {
    const novoTarefa = new Tarefas(Descricao, DataTermino, Prioridade, "Em aberto")
    const banco = new TarefasDataBase();
    banco.Inserir(novoTarefa);
    this.ListarTarefas()
  }

  ConcluirTarefa = (id) => {
    const banco = new TarefasDataBase();
    banco.Concluir(id);
    this.ListarTarefas()
    //DevSettings.reload();
  }

  AbrirTarefa = (id) => {
    const banco = new TarefasDataBase();
    banco.Abrir(id);
    this.ListarTarefas()
    //DevSettings.reload();
  }

  DeletarTarefa = (id) => {
    const banco = new TarefasDataBase();
    banco.Deletar(id);
    this.ListarTarefas()
  }

  MostrarData() {
    var date = new Date().getDate() - 1;
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    Alert.alert(date + '/' + month + '/' + year)
      

  }

  render() {
    return (

      <View style={estilo.datacontainer}>

        <Button color='black' title="Data atual" onPress={this.MostrarData} />



        <View>
          <View style={{ flexDirection: 'row' }}>

            <Text style={estilo.titulo} >CADASTRO DE TAREFAS </Text>
          </View>
          <TextInput style={estilo.caixatexto} placeholder='Descrição da tarefa... ' onChangeText={(valor) => { this.setState({ Descricao: valor }) }} />
          <TextInput style={estilo.caixatexto} placeholder='Digite a data de término (dd/mm/aaaa)... ' onChangeText={(valor) => { this.setState({ DataTermino: valor }) }} />
          <TextInput style={estilo.caixatexto} placeholder='Digite a prioridade (alta/baixa)... ' onChangeText={(valor) => { this.setState({ Prioridade: valor }) }} />





          <TouchableOpacity style={estilo.botao2} onPress={() => { this.CadastrarTarefa(this.state.Descricao, this.state.DataTermino, this.state.Prioridade, this.state.Status) }}>

            <Text style={{color:'black'}}>SALVAR</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={estilo.titulo} >LISTAGEM DE TAREFAS</Text>
        </View>
        <Text>

        </Text>
        <ScrollView>
          {
            this.state.listaTarefas.map(tarefa => (
              <ListaTarefas
                key={tarefa.id}
                tarefa={tarefa}
                id={tarefa.id}
                Descricao={tarefa.Descricao}
                DataTermino={tarefa.DataTermino}
                Prioridade={tarefa.Prioridade}
                Status={tarefa.Status}
                concluir={this.ConcluirTarefa}
                deletar={this.DeletarTarefa}
               
                


              />))

          }
        </ScrollView>
      </View>
    )
  }
}

const estilo = StyleSheet.create({

  container: {
    flexDirection: 'row',

  },

  datacontainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
   
    
  },
  titulo: {

    backgroundColor: '#9CB7BC',
    fontSize: 26,
    margin: 5,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,

  },

  caixatexto: {

    backgroundColor: '#dcdcdc',
    fontSize: 18,
    margin: 3,
    color: 'black',
    fontWeight: 'bold',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,


  },
  botao: {
    width: 100,
    height: 80,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: "center",
    padding: 10,
    margin: 5,
    color: 'white',
    borderRadius: 4,
    alignContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row'
  },

  botao2: {
    width: 100,
    height: 40,
    backgroundColor: '#7ACED7',
    alignItems: 'center',
    justifyContent: "center",
    padding: 10,
    margin: 2,
    color: 'white',
    borderRadius: 4,
    alignContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row'
  },

  areaBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
})