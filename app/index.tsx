import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { theme } from "../assets/colors";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0}>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableHighlight
          onPress={() => console.log("pressed")}
          underlayColor={"red"}
          activeOpacity={0.5}
        >
          <Text style={styles.btnText}>Travel</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.header}>
        {/* UI 변화 없음(시각적 피드백x) */}
        <TouchableWithoutFeedback onPress={() => console.log("no feedback!")}>
          <Text style={styles.btnText}>no피드백</Text>
        </TouchableWithoutFeedback>
        {/* press 상호작용 감지 - 컴포넌트 주변의 press를 감지해 동작할 수 있음*/}
        <Pressable>
          <Text style={styles.btnText}>Press</Text>
        </Pressable>
      </View>
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
});
