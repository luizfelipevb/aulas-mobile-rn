import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import {
    Alert, Button, StyleSheet, Text,
    TextInput, Modal, View, Pressable
} from 'react-native';

export default function App() {
    const [texto, setTexto] = useState("");
    const [isChecked, setChecked] = useState(false);
    const [modalVisivel, setModalVisivel] = useState(false);

    function testeExecucaoBtn() {
        Alert.alert("Clicou")
    }

    return (
        <View style={styles.container}>
            <Text>To-Do List</Text>
            <StatusBar style="auto" />
            <View style={styles.todolist}>
                <MaterialIcons name="delete" size={24} color="#0b0b0b" />
                <Text>Tarefas</Text>
                <TextInput style={styles.input} onChangeText={setTexto} />
                <Button title="Clique Aqui" onPress={testeExecucaoBtn} />
                <Checkbox
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#4630EB' : undefined}
                />
            </View>
            <Pressable style={styles.pressicon} onPress={() => setModalVisivel(true)}>
                <MaterialIcons name="add" size={38} color="#fff" />
            </Pressable>
            <Modal visible={modalVisivel} animationType="slide" transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10 }}>
                        <Text>Este é o conteúdo do Modal!</Text>

                        <Pressable onPress={() => setModalVisivel(false)}>
                            <Text>Fechar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9eaea',
        alignItems: 'center',
        justifyContent: 'center',
    },
    todolist: {
        width: "80%",
        height: "80%",
        backgroundColor: "#d4bebe"
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderColor: '#ebe9e9',
        borderWidth: 4
    },
    pressicon: {
        position: "absolute",
        top: "88%",
        left: "80%",
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        borderRadius: "50%",
        backgroundColor: "#515CC6",
        borderColor: '#5b5858',
    }
});