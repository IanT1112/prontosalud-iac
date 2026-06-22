import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AmbulanceLogin() {
  const router = useRouter();

  const [plate, setPlate] = useState("");
  const [password, setPassword] = useState("");

  const disabled = plate.trim() === "" || password.trim() === "";

  return (
    <LinearGradient colors={["#8B0000", "#FFFFFF"]} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* LOGO */}
          <View style={styles.logoSection}>
            <Image
              source={require("./images/logo_medi.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>PRONTOSALUD</Text>
          </View>

          {/* FORM */}
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Placa vehicular"
              placeholderTextColor="#9E9E9E"
              value={plate}
              onChangeText={setPlate}
              autoCapitalize="characters"
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#9E9E9E"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Pressable
              style={[styles.loginButton, disabled && { opacity: 0.4 }]}
              disabled={disabled}
              onPress={() => router.push("/homeambulance")}
            >
              <Text style={styles.loginText}>Ingresar</Text>
            </Pressable>

            <Pressable onPress={() => router.push("/registerambulance")}>
              <Text style={styles.registerText}>
                ¿No está registrado? Regístrese
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 28,
  },

  /* Logo */
  logoSection: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },

  /* Form */
  form: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 18,
    padding: 22,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#333",
    marginBottom: 14,
    elevation: 2,
  },

  loginButton: {
    backgroundColor: "#8B0000",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 14,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  registerText: {
    textAlign: "center",
    color: "#8B0000",
    fontSize: 14,
    fontWeight: "600",
  },
});
