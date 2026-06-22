import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#8B0000", "#FFFFFF"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* TÍTULO */}
        <Text style={styles.title}>PRONTOSALUD</Text>

        {/* EMERGENCIA */}
        <LinearGradient
          colors={["#FF3B3B", "#FFFFFF"]}
          style={styles.emergency}
        >
          <Text style={styles.emergencyText}>EMERGENCIA</Text>
        </LinearGradient>

        {/* PERSONAS */}
        {[1, 2, 3, 4].map((i) => (
          <Pressable key={i} onPress={() => router.push("/person")}>
            <View style={styles.personCard}>
              <Text style={styles.personName}>Nombre {i}</Text>
              <Text style={styles.personInfo}>Edad: --</Text>
              <Text style={styles.personInfo}>Dirección: -----</Text>
              <Text style={styles.personInfo}>📞 --------</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 70,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 26,
    letterSpacing: 1,
  },

  /* Emergencia */
  emergency: {
    borderRadius: 20,
    paddingVertical: 26,
    marginBottom: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  emergencyText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#B00000",
    letterSpacing: 1,
  },

  /* Personas */
  personCard: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  personName: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    color: "#8B0000",
  },
  personInfo: {
    fontSize: 13,
    color: "#444",
  },
});
