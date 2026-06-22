import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Login() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#265C8E",
      }}
    >
      <Text style={{ color: "white", fontSize: 28, marginBottom: 20 }}>
        PRONTOSALUD
      </Text>

      <Pressable
        onPress={() => router.push("/role")}
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#265C8E", fontWeight: "bold" }}>Iniciar</Text>
      </Pressable>
    </View>
  );
}
