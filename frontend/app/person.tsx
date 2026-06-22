import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
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

export default function PersonDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [paciente, setPaciente] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/pacientes/${id}`)
      .then((res) => res.json())
      .then((data) => setPaciente(data))
      .catch(() => Alert.alert("Error", "No se pudo cargar el paciente"));
  }, [id]);

  if (!paciente)
    return (
      <LinearGradient
        colors={["#8B0000", "#FFFFFF"]}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Cargando...</Text>
      </LinearGradient>
    );

  return (
    <LinearGradient colors={["#8B0000", "#FFFFFF"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient
          colors={["#FF3B3B", "#FFFFFF"]}
          style={styles.emergency}
        >
          <Text style={styles.emergencyText}>EMERGENCIA ACTIVA</Text>
        </LinearGradient>

        <LinearGradient
          colors={["#1E90FF", "#FFFFFF"]}
          style={styles.personBox}
        >
          <Text style={styles.personName}>{paciente.nombre}</Text>
          <Text style={styles.personInfo}>Edad: {paciente.edad}</Text>
          <Text style={styles.personInfo}>Dirección: {paciente.direccion}</Text>
          <Text style={styles.personInfo}>📞 {paciente.telefono}</Text>
        </LinearGradient>

        <LinearGradient colors={["#FFFFFF", "#F2F2F2"]} style={styles.history}>
          <Text style={styles.sectionTitle}>
            🤖 Resumen IA — Historial Clínico
          </Text>
          <ScrollView style={{ maxHeight: 200 }}>
            {paciente.historial?.resumenIA ? (
              <Text style={styles.historyItem}>
                {paciente.historial.resumenIA}
              </Text>
            ) : (
              <>
                {paciente.historial?.alergias?.map((a: string, i: number) => (
                  <Text key={i} style={styles.historyItem}>
                    • Alergia: {a}
                  </Text>
                ))}
                {paciente.historial?.condiciones?.map(
                  (c: string, i: number) => (
                    <Text key={i} style={styles.historyItem}>
                      • {c}
                    </Text>
                  ),
                )}
                {paciente.historial?.medicamentos?.map(
                  (m: string, i: number) => (
                    <Text key={i} style={styles.historyItem}>
                      • Medicamento: {m}
                    </Text>
                  ),
                )}
                {paciente.historial?.observaciones ? (
                  <Text style={styles.historyItem}>
                    • {paciente.historial.observaciones}
                  </Text>
                ) : null}
                {!paciente.historial?.alergias?.length &&
                  !paciente.historial?.condiciones?.length &&
                  !paciente.historial?.medicamentos?.length && (
                    <Text style={styles.historyItem}>
                      Sin historial registrado
                    </Text>
                  )}
              </>
            )}
          </ScrollView>
        </LinearGradient>

        <View style={styles.map}>
          <Text style={{ color: "#666" }}>MAPA</Text>
        </View>

        <Pressable onPress={() => router.push("/bwaze")}>
          <LinearGradient colors={["#FF0000", "#FFFFFF"]} style={styles.button}>
            <Text style={styles.buttonText}>EN CAMINO</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { padding: 22, paddingTop: 60 },
  emergency: {
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  emergencyText: { fontSize: 18, fontWeight: "900", color: "#B00000" },
  personBox: { borderRadius: 16, padding: 18, marginBottom: 18 },
  personName: { fontSize: 18, fontWeight: "800", marginBottom: 6 },
  personInfo: { fontSize: 14 },
  history: { borderRadius: 16, padding: 16, marginBottom: 18 },
  sectionTitle: { fontWeight: "800", marginBottom: 6 },
  historyItem: { fontSize: 13, marginBottom: 4 },
  map: {
    height: 160,
    backgroundColor: "#EEE",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
  },
  button: { borderRadius: 18, paddingVertical: 18, alignItems: "center" },
  buttonText: { fontWeight: "900", color: "#8B0000", fontSize: 16 },
});
