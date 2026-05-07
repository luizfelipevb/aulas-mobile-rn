// Importa o componente StatusBar da biblioteca Expo
// Essa linha usa ES Modules (import/export)
// O bundler (Metro) resolve esse pacote dentro do node_modules
// StatusBar é um componente React que conversa com APIs nativas (Android/iOS)
// Ele NÃO renderiza visual direto na árvore como View/Text, mas altera o sistema
import { StatusBar } from 'expo-status-bar';

// Importa vários componentes do React Native
// Cada item aqui é uma ponte (bridge) entre JavaScript e código nativo
// Ou seja: quando você usa <View>, o React Native cria um equivalente nativo
import {
  StyleSheet,       // Abstração para criar estilos otimizados (transforma em IDs internos)
  Text,             // Componente nativo de texto (UILabel no iOS / TextView no Android)
  View,             // Container genérico (UIView / ViewGroup)
  TouchableOpacity, // Wrapper que detecta toque e aplica efeito de opacidade
  Modal,            // Componente que renderiza fora da árvore principal (portal nativo)
  TextInput         // Campo de entrada (EditText / UITextField)
} from 'react-native';

// Importa o componente Checkbox da biblioteca Expo
// Esse componente encapsula comportamento nativo de checkbox
import Checkbox from 'expo-checkbox';

// Importa o hook useState do React
// Hooks são funções que mantêm estado entre renderizações
// Internamente o React usa um array de estados indexados por ordem de execução
import { useState } from 'react';

// Define o componente principal do app
// Função que retorna JSX (que será convertido em chamadas React.createElement)
// Esse componente será re-executado a cada mudança de estado
export default function App() {

  // Cria um objeto Date com base no relógio do dispositivo
  // Internamente isso usa o timestamp atual (milissegundos desde 1970)
  const data = new Date();

  // Cria um formatador de data usando a API Intl
  // Intl é uma API nativa do JavaScript para internacionalização
  const dataExtenso = new Intl.DateTimeFormat('pt-BR', {

    // Define que o dia será numérico (ex: 7)
    day: 'numeric',

    // Define que o mês será por extenso (ex: maio)
    month: 'long',

    // Define que o ano será numérico (ex: 2026)
    year: 'numeric'

  // Executa o método format() passando a data
  // Retorna uma string pronta (ex: "7 de maio de 2026")
  }).format(data);

  // ================= ESTADOS =================

  // useState([]) cria um estado inicial vazio
  // tarefas = valor atual armazenado
  // setTarefas = função que agenda atualização de estado
  // Quando setTarefas é chamado → React agenda re-render
  const [tarefas, setTarefas] = useState([]);

  // Estado booleano que controla visibilidade do modal
  // false = não renderiza | true = renderiza
  const [modalVisible, setModalVisible] = useState(false);

  // Estado para armazenar texto digitado no input "nome"
  const [nome, setNome] = useState('');

  // Estado para categoria
  const [categoria, setCategoria] = useState('');

  // Estado para emoji
  const [emoji, setEmoji] = useState('');

  // ================= FILTROS =================

  // filter percorre o array "tarefas"
  // Para cada elemento (t), executa a função
  // Retorna novo array (imutável) com apenas os que passaram na condição
  const incompletas = tarefas.filter(t => !t.concluida);

  // Mesmo processo, mas agora pegando concluídas
  const realizadas = tarefas.filter(t => t.concluida);

  // ================= TOGGLE =================

  function toggleTarefa(id) {

    // map cria um novo array (não altera o original)
    const novas = tarefas.map(t =>

      // Verifica se o id da tarefa atual é igual ao clicado
      t.id === id

        // Spread operator (...) copia todas propriedades do objeto
        // Depois sobrescreve "concluida"
        ? { ...t, concluida: !t.concluida }

        // Caso contrário, retorna o objeto original sem alteração
        : t
    );

    // Atualiza o estado com o novo array
    // Isso dispara reconciliação do React (diff virtual DOM)
    setTarefas(novas);
  }

  // ================= ADICIONAR =================

  function adicionarTarefa() {

    // Se nome estiver vazio (string vazia = false)
    // return encerra a função imediatamente
    if (!nome) return;

    // Cria um novo objeto literal
    const nova = {

      // Date.now() retorna timestamp atual em milissegundos
      // usado aqui como ID simples
      id: Date.now(),

      // atribui valor do estado nome
      nome: nome,

      // Template string (``) concatena emoji + categoria
      categoria: `${emoji} ${categoria}`,

      // Define como não concluída
      concluida: false
    };

    // Spread operator copia array atual e adiciona nova no final
    // Isso mantém imutabilidade (boa prática no React)
    setTarefas([...tarefas, nova]);

    // Limpa inputs (zera estados)
    setNome('');
    setCategoria('');
    setEmoji('');

    // Fecha modal alterando estado
    setModalVisible(false);
  }

  // ================= RENDER =================

  return (

    // View principal
    // styles.container é um objeto transformado em ID interno
    <View style={styles.container}>

      {/* Configura barra de status */}
      <StatusBar style="auto" />

      {/* Renderiza string da data */}
      <Text style={styles.data}>{dataExtenso}</Text>

      {/* Renderiza contadores */}
      <Text style={styles.resumo}>
        {incompletas.length} incompletas, {realizadas.length} realizadas
      </Text>

      {/* Título */}
      <Text style={styles.titulo}>Incompletas</Text>

      {/* map percorre array e retorna lista de componentes */}
      {incompletas.map(item => (

        // key ajuda o React a identificar cada item na reconciliação
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

      {/* Botão flutuante */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.botaoTexto}>+</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}   // React controla renderização
        animationType="fade"     // animação nativa
        transparent={true}       // permite overlay
      >

        <View style={styles.overlay}>

          {/* Área clicável para fechar */}
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setModalVisible(false)}
          />

          {/* Caixa do modal */}
          <View style={styles.modalBox}>

            <Text style={styles.modalTitulo}>Tarefa</Text>

            <TextInput
              style={styles.input}
              placeholder="Realizar treino..."
              value={nome}
              onChangeText={setNome}
            />

            <View style={styles.row}>

              <View style={styles.emojiBox}>
                <TextInput
                  value={emoji}
                  onChangeText={setEmoji}
                  style={styles.emojiInput}
                  placeholder="🧑"
                />
              </View>

              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Categoria"
                value={categoria}
                onChangeText={setCategoria}
              />

            </View>

            <TouchableOpacity style={styles.criar} onPress={adicionarTarefa}>
              <Text style={{ color: '#fff' }}>Criar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}

// ================= ESTILOS =================

// StyleSheet.create converte esse objeto em IDs internos
// Isso melhora performance pois evita recriar objetos a cada render
const styles = StyleSheet.create({

  container: {
    flex: 1, // ocupa tela inteira
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
    flexDirection: 'row', // layout horizontal
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
    position: 'absolute', // posicionamento fixo
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

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },

  emojiBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emojiInput: {
    fontSize: 20,
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