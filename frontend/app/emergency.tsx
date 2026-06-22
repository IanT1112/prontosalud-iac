import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function EmergencyScreen() {
  return (
    <LinearGradient colors={["#F5FAFE", "#265C8E"]} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* CUADRO EMERGENCIA */}
        <LinearGradient
          colors={["#FF3B3B", "#FFFFFF"]}
          style={styles.emergencyBox}
        >
          <Text style={styles.emergencyTitle}>EMERGENCIA</Text>
        </LinearGradient>

        {/* CUADRO USUARIO */}
        <View style={styles.userBox}>
          <Text style={styles.userText}>Nombre: Juan Pérez</Text>
          <Text style={styles.userText}>Edad: 35 años</Text>
          <Text style={styles.userText}>Dirección: Av. Principal 123</Text>
        </View>

        {/* CUADRO MAPA (placeholder) */}
        <View style={styles.mapBox}>
          <Text style={styles.mapText}>MAPA</Text>
        </View>

        {/* MENSAJE */}
        <Text style={styles.helpText}>Llegó la ayuda</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 24,
    alignItems: "center",
  },

  /* Emergencia */
  emergencyBox: {
    width: "100%",
    height: 120,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  emergencyTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#C62828",
    letterSpacing: 1,
  },

  /* Usuario */
  userBox: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
  },
  userText: {
    fontSize: 15,
    color: "#1A3F61",
    marginBottom: 6,
    fontWeight: "500",
  },

  /* Mapa */
  mapBox: {
    width: "100%",
    height: 180,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#D0DCE8",
  },
  mapText: {
    color: "#8AADCA",
    fontSize: 16,
    fontWeight: "600",
  },

  /* Mensaje */
  helpText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 10,
    letterSpacing: 0.5,
  },
});
