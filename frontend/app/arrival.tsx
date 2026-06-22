import { LinearGradient } from "expo-linear-gradient";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function Arrival() {
  return (
    <LinearGradient colors={["#8B0000", "#FFFFFF"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* EMERGENCIA */}
        <LinearGradient
          colors={["#FF3B3B", "#FFFFFF"]}
          style={styles.emergency}
        >
          <Text style={styles.emergencyText}>EMERGENCIA EN ATENCIÓN</Text>
        </LinearGradient>

        {/* PERSONA */}
        <LinearGradient
          colors={["#1E90FF", "#FFFFFF"]}
          style={styles.personBox}
        >
          <Text style={styles.personName}>Nombre Ejemplo</Text>
          <Text style={styles.personInfo}>Edad: 35</Text>
          <Text style={styles.personInfo}>Dirección: Av. Principal 123</Text>
          <Text style={styles.personInfo}>📞 999 999 999</Text>
        </LinearGradient>

        {/* CONCLUSIÓN */}
        <LinearGradient
          colors={["#FF3B3B", "#FFFFFF"]}
          style={styles.conclusion}
        >
          <Text style={styles.sectionTitle}>Conclusión / Diagnóstico</Text>

          <TextInput
            multiline
            editable
            style={styles.textArea}
            value={`Paciente masculino de 35 años, consciente y orientado.
Presenta dificultad respiratoria moderada asociada a antecedente de asma.
Signos vitales estables, saturación de oxígeno al 93%.
Se administra broncodilatador en campo con buena respuesta.
Se recomienda traslado a centro hospitalario para observación y manejo complementario.`}
          />
        </LinearGradient>

        {/* BOTONES */}
        <View style={styles.buttonRow}>
          {/* ATENDIDO */}
          <Pressable style={{ flex: 1 }}>
            <LinearGradient
              colors={["#4FC3F7", "#FFFFFF"]}
              style={styles.button}
            >
              <Text style={styles.attendedText}>ATENDIDO</Text>
            </LinearGradient>
          </Pressable>

          {/* CAMINO A */}
          <Pressable style={{ flex: 1 }}>
            <LinearGradient
              colors={["#FF3B3B", "#FFFFFF"]}
              style={styles.button}
            >
              <Text style={styles.routeText}>CAMINO A</Text>
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

  conclusion: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 22,
  },
  sectionTitle: {
    fontWeight: "800",
    marginBottom: 10,
  },
  textArea: {
    minHeight: 160,
    fontSize: 14,
    color: "#222",
    textAlignVertical: "top",
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
  attendedText: {
    fontWeight: "900",
    color: "#0277BD",
    fontSize: 14,
  },
  routeText: {
    fontWeight: "900",
    color: "#8B0000",
    fontSize: 14,
  },
});
