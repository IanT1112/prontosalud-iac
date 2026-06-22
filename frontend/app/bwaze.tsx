import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function PersonDetail() {
  const router = useRouter(); // ✅ ahora sí existe

  const openWaze = () => {
    Linking.openURL("https://waze.com/ul?ll=-12.0464,-77.0428&navigate=yes");
  };

  return (
    <LinearGradient colors={["#8B0000", "#FFFFFF"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* EMERGENCIA */}
        <LinearGradient
          colors={["#FF3B3B", "#FFFFFF"]}
          style={styles.emergency}
        >
          <Text style={styles.emergencyText}>EMERGENCIA ACTIVA</Text>
        </LinearGradient>

        {/* DATOS PERSONA */}
        <LinearGradient
          colors={["#1E90FF", "#FFFFFF"]}
          style={styles.personBox}
        >
          <Text style={styles.personName}>Nombre Ejemplo</Text>
          <Text style={styles.personInfo}>Edad: 35</Text>
          <Text style={styles.personInfo}>Dirección: Av. Principal 123</Text>
          <Text style={styles.personInfo}>📞 999 999 999</Text>
        </LinearGradient>

        {/* HISTORIAL */}
        <LinearGradient colors={["#FFFFFF", "#F2F2F2"]} style={styles.history}>
          <Text style={styles.sectionTitle}>Historial Clínico</Text>
          <ScrollView style={{ maxHeight: 140 }}>
            <Text style={styles.historyItem}>• Asma diagnosticada (2018)</Text>
            <Text style={styles.historyItem}>• Alergia a penicilina</Text>
            <Text style={styles.historyItem}>• Última atención: Feb 2026</Text>
            <Text style={styles.historyItem}>• Medicación: Salbutamol</Text>
            <Text style={styles.historyItem}>• Sin cirugías previas</Text>
          </ScrollView>
        </LinearGradient>

        {/* MAPA */}
        <View style={styles.map}>
          <Text style={{ color: "#666" }}>MAPA (ejemplo)</Text>
        </View>

        {/* BOTONES */}
        <View style={styles.buttonRow}>
          {/* WAZE */}
          <Pressable onPress={openWaze} style={{ flex: 1 }}>
            <LinearGradient
              colors={["#4FC3F7", "#FFFFFF"]}
              style={styles.button}
            >
              <Text style={styles.wazeText}>IR CON WAZE</Text>
            </LinearGradient>
          </Pressable>

          {/* LLEGAMOS */}
          <Pressable
            onPress={() => router.push("/arrival")}
            style={{ flex: 1 }}
          >
            <LinearGradient
              colors={["#FF3B3B", "#FFFFFF"]}
              style={styles.button}
            >
              <Text style={styles.arrivedText}>LLEGAMOS</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 22,
    paddingTop: 60,
  },

  emergency: {
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  emergencyText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#B00000",
  },

  personBox: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },
  personName: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  personInfo: {
    fontSize: 14,
  },

  history: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  sectionTitle: {
    fontWeight: "800",
    marginBottom: 6,
  },
  historyItem: {
    fontSize: 13,
    marginBottom: 4,
  },

  map: {
    height: 160,
    backgroundColor: "#EEE",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },

  button: {
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
  },

  wazeText: {
    fontWeight: "900",
    color: "#0277BD",
    fontSize: 14,
  },

  arrivedText: {
    fontWeight: "900",
    color: "#8B0000",
    fontSize: 14,
  },
});
