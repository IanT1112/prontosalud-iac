import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function Home() {
  const router = useRouter();
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/pacientes`)
      .then((res) => res.json())
      .then((data) => setPacientes(data))
      .catch(() => Alert.alert("Error", "No se pudo cargar los pacientes"));
  }, []);

  return (
    <LinearGradient colors={["#F5FAFE", "#265C8E"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>PRONTOSALUD</Text>

        <Pressable onPress={() => router.push("/emergency")}>
          <LinearGradient
            colors={["#FF3B3B", "#FFFFFF"]}
            style={styles.emergency}
          >
            <Text style={styles.emergencyText}>EMERGENCIA</Text>
          </LinearGradient>
        </Pressable>

        {pacientes.map((p: any) => (
          <Pressable
            key={p._id}
            onPress={() =>
              router.push({
                pathname: "/person",
                params: {
                  id: p._id,
                  name: p.nombre,
                  age: p.edad,
                  address: p.direccion,
                  phone: p.telefono,
                },
              })
            }
          >
            <View style={styles.card}>
              <Text style={styles.name}>{p.nombre}</Text>
              <Text>Edad: {p.edad}</Text>
              <Text>📍 {p.direccion}</Text>
              <Text>📞 {p.telefono}</Text>
            </View>
          </Pressable>
        ))}

        <LinearGradient colors={["#1E90FF", "#FFFFFF"]} style={styles.add}>
          <Pressable onPress={() => router.push("/register")}>
            <Text style={styles.addText}>Registrar usuario</Text>
          </Pressable>
        </LinearGradient>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingTop: 70 },
  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    color: "#265C8E",
    marginBottom: 20,
  },
  emergency: {
    borderRadius: 18,
    padding: 22,
    marginBottom: 25,
    alignItems: "center",
  },
  emergencyText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#B00000",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  name: { fontWeight: "700", marginBottom: 4 },
  add: {
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
  },
  addText: { fontWeight: "700", color: "#0A3D91" },
});
