import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../assets/colors";

export default function HomeScreen() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({}); // hashmap 형태로 사용

  const travel = () => setWorking(false);
  const work = () => setWorking(true);

  const onChangeText = (payload: string) => {
    setText(payload);
    console.log(payload);
  };

  const addTodo = () => {
    if (text === "") return;

    const newTodos = Object.assign({}, todos, {
      [Date.now()]: { text, work: working },
    });
    setTodos(newTodos);
    setText("");
  };

  console.log(todos);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
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
    marginTop: 20,
    fontSize: 18,
  },
});
