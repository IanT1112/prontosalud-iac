import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Role() {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, textAlign: "center", marginBottom: 20 }}>
        ¿Qué papel quieres probar?
      </Text>

      <Pressable
        onPress={() => router.push("/user")}
        style={{
          backgroundColor: "#1E90FF",
          padding: 15,
          marginBottom: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Ser Usuario</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/ambulance")}
        style={{
          backgroundColor: "#DC143C",
          padding: 15,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Ser Ambulancia
        </Text>
      </Pressable>
    </View>
  );
}
