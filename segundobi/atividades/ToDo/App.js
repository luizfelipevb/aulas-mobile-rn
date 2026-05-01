import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

export default function App() {
  const data = new Date();

  const dataExtenso = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(data);

  // LISTA DE TAREFAS
  const [tarefas, setTarefas] = useState([]);

  // CONTROLE DO MODAL
  const [modalVisible, setModalVisible] = useState(false);

  // INPUTS
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [emoji, setEmoji] = useState('');

  // FILTROS
  const incompletas = tarefas.filter(t => !t.concluida);
  const realizadas = tarefas.filter(t => t.concluida);

  // TOGGLE
  function toggleTarefa(id) {
    const novas = tarefas.map(t =>
      t.id === id ? { ...t, concluida: !t.concluida } : t
    );
    setTarefas(novas);
  }

  // ADICIONAR NOVA TAREFA
  function adicionarTarefa() {
    if (!nome) return; // evita vazio

    const nova = {
      id: Date.now(), // id único
      nome: nome,
      categoria: `${emoji} ${categoria}`,
      concluida: false
    };

    setTarefas([...tarefas, nova]);

    // limpa campos
    setNome('');
    setCategoria('');
    setEmoji('');

    // fecha modal
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.data}>{dataExtenso}</Text>
      <Text style={styles.resumo}>
        {incompletas.length} incompletas, {realizadas.length} realizadas
      </Text>

      {/* INCOMPLETAS */}
      <Text style={styles.titulo}>Incompletas</Text>

      {incompletas.map(item => (
        <View key={item.id} style={styles.item}>
          <Checkbox
            value={item.concluida}
            onValueChange={() => toggleTarefa(item.id)}
          />
          <View style={styles.textos}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.categoria}>{item.categoria}</Text>
          </View>
        </View>
      ))}

      {/* REALIZADAS */}
      <Text style={styles.titulo}>Realizadas</Text>

      {realizadas.map(item => (
        <View key={item.id} style={styles.item}>
          <Checkbox
            value={item.concluida}
            onValueChange={() => toggleTarefa(item.id)}
          />
          <Text style={styles.concluida}>{item.nome}</Text>
        </View>
      ))}

      {/* BOTÃO + */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.botaoTexto}>+</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>

          <Text style={styles.modalTitulo}>Nova Tarefa</Text>

          <Text>Tarefa</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a tarefa"
            value={nome}
            onChangeText={setNome}
          />

          <Text>Emoji</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 💰"
            value={emoji}
            onChangeText={setEmoji}
          />

          <Text>Categoria</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Mercado"
            value={categoria}
            onChangeText={setCategoria}
          />

          <TouchableOpacity style={styles.criar} onPress={adicionarTarefa}>
            <Text style={{ color: '#fff' }}>Criar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={{ marginTop: 10, color: 'red' }}>Cancelar</Text>
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  data: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 50,
  },

  resumo: {
    color: '#666',
    marginBottom: 20,
  },

  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  textos: {
    marginLeft: 10,
  },

  nome: {
    fontSize: 16,
  },

  categoria: {
    fontSize: 12,
    color: '#888',
  },

  concluida: {
    marginLeft: 10,
    color: '#aaa',
    textDecorationLine: 'line-through',
  },

  botao: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4f46e5',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoTexto: {
    color: '#fff',
    fontSize: 30,
  },

  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },

  criar: {
    backgroundColor: '#4f46e5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
});