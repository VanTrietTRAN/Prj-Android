import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";


export default function Index() {
  return (
    // 
    <View
      style={styles.container}
    >
      <Text style = {{color : "blue"}}>Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/about"}>About</Link>
      <View>
        Hello
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple"
  },
})
