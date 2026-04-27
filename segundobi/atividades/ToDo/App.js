import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import NeyImg from "./assets/splash-icon.jpg";

export default function App() {
    const [texto, setTexto] = useState("");

    function testeExecucaoBtn() {
        Alert.alert("Clicou")
    }

    return (
        <View style={styles.container}>
            <Text>To-Do List</Text>
            <StatusBar style="auto" />
            <View>
                <Text>Tarefas</Text>
                <TextInput onChangeText={setTexto} />
                <Text>Valor{texto}</Text>
                <TouchableOpacity onPress={testeExecucaoBtn}>
                    <Text>
                        Clique Aqui
                    </Text>
                </TouchableOpacity>
                <Button title="Clique Aqui" onPress={testeExecucaoBtn} />
                <Image style={styles.imgNey}
                    source={NeyImg} width={280} height={440} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fadede',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgNey: {
        marginTop: "180",
    }
});