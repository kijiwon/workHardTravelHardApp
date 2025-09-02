import { Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../assets/colors";

// storage key
const STORAGE_KEY = "@todos";

export default function HomeScreen() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({}); // hashmap 형태로 사용

  const onChangeMode = async (mode: string) => {
    if (mode === "working") setWorking(true);
    if (mode === "travel") setWorking(false);
    try {
      await AsyncStorage.setItem("@mode", mode);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeText = (payload: string) => {
    setText(payload);
  };

  const addTodo = async () => {
    if (text === "") return;

    const newTodos = { ...todos, [Date.now()]: { text, working } };
    setTodos(newTodos);
    await saveTodos(newTodos);
    setText("");
  };

  const saveTodos = async (toSave: object) => {
    try {
      const todoData = JSON.stringify(toSave);
      await AsyncStorage.setItem(STORAGE_KEY, todoData);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTodo = (key: string) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "Sure", // 삭제 동작 실행
        style: "destructive",
        onPress: async () => {
          const newTodos = { ...todos };
          delete newTodos[key]; // 동일한 key의 데이터 삭제
          setTodos(newTodos);
          await saveTodos(newTodos);
        },
      },
    ]);
  };

  const loadTodos = async () => {
    try {
      const mode = await AsyncStorage.getItem("@mode");
      console.log("mode>>>", mode);
      if (mode === "working") {
        setWorking(true);
      } else {
        setWorking(false);
      }

      const res = await AsyncStorage.getItem(STORAGE_KEY);
      if (res) setTodos(JSON.parse(res));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onChangeMode("working")}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChangeMode("travel")}>
          <Text
            style={{ ...styles.btnText, color: working ? theme.grey : "white" }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        onSubmitEditing={addTodo}
        returnKeyType="done"
        // secureTextEntry // 비밀번호 입력시
        // multiline // 두 줄 이상 입력
        // autoCapitalize="words" // 단어의 시작은 대문자로 입력
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        placeholderTextColor={"blue"}
        value={text}
      />

      <ScrollView>
        {Object.keys(todos)!.map(
          (key) =>
            todos[key].working === working && (
              <View key={key} style={styles.todo}>
                <Text style={styles.todoText}>{todos[key].text}</Text>
                <TouchableOpacity onPress={() => deleteTodo(key)}>
                  <Fontisto name="trash" size={18} color={theme.grey} />
                </TouchableOpacity>
              </View>
            )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  btnText: {
    color: "white",
    fontSize: 38,
    fontWeight: 600,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  todo: {
    backgroundColor: theme.todoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
