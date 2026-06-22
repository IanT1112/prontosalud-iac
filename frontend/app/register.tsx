import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    celular: "",
    dni: "",
    email: "",
    password: "",
    clinica: "",
    seguro: "",
  });
  const [pdf, setPdf] = useState<any>(null);

  const handlePickPDF = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!result.canceled) {
      setPdf(result.assets[0]);
    }
  };

  const handleRegister = async () => {
    if (!form.email || !form.password || !form.dni) {
      Alert.alert("Error", "Email, DNI y contraseña son obligatorios");
      return;
    }
    try {
      // 1. Crear usuario
      const resUsuario = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: `${form.nombre} ${form.apellidos}`,
          email: form.email,
          password: form.password,
          rol: "paciente",
        }),
      });
      const dataUsuario = await resUsuario.json();
      if (!resUsuario.ok) {
        Alert.alert("Error", dataUsuario.error || "No se pudo registrar");
        return;
      }

      // 2. Crear paciente
      const resPaciente = await fetch(`${API_URL}/api/pacientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: `${form.nombre} ${form.apellidos}`,
          edad: 0,
          direccion: "",
          telefono: form.celular,
        }),
      });
      const dataPaciente = await resPaciente.json();

      // 3. Si hay PDF, mandarlo a procesar con IA
      if (pdf && dataPaciente._id) {
        const formData = new FormData();
        formData.append("pdf", {
          uri: pdf.uri,
          name: pdf.name,
          type: "application/pdf",
        } as any);

        await fetch(`${API_URL}/api/historial/${dataPaciente._id}`, {
          method: "POST",
          body: formData,
        });
        Alert.alert("✅ Registro exitoso", "Historial procesado con IA");
      } else {
        Alert.alert("✅ Registro exitoso", "Ya puedes iniciar sesión");
      }

      router.replace("/");
    } catch (err) {
      Alert.alert("Error", "No se pudo conectar al servidor");
    }
  };

  const campos = [
    { key: "nombre", label: "Nombre" },
    { key: "apellidos", label: "Apellidos" },
    { key: "celular", label: "Celular" },
    { key: "dni", label: "DNI" },
    { key: "email", label: "Correo electrónico", keyboard: "email-address" },
    { key: "password", label: "Contraseña", secure: true },
    { key: "clinica", label: "Clínica u hospital" },
    { key: "seguro", label: "Seguro" },
  ];

  return (
    <LinearGradient colors={["#F5FAFE", "#265C8E"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>PRONTOSALUD</Text>

          {campos.map((c) => (
            <TextInput
              key={c.key}
              placeholder={c.label}
              placeholderTextColor="#8AADCA"
              style={styles.input}
              value={form[c.key as keyof typeof form]}
              onChangeText={(val) => setForm({ ...form, [c.key]: val })}
              secureTextEntry={c.secure || false}
              keyboardType={(c.keyboard as any) || "default"}
              autoCapitalize="none"
            />
          ))}

          <Pressable style={styles.pdfButton} onPress={handlePickPDF}>
            <Text style={styles.pdfButtonText}>
              {pdf ? `📄 ${pdf.name}` : "📎 Subir historial clínico (PDF)"}
            </Text>
          </Pressable>

          {pdf && (
            <View style={styles.pdfInfo}>
              <Text style={styles.pdfInfoText}>
                ✅ PDF seleccionado — se procesará con IA al registrarse
              </Text>
            </View>
          )}

          <Pressable style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { padding: 28, paddingTop: 80 },
  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    color: "#265C8E",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  pdfButton: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#265C8E",
    borderStyle: "dashed",
  },
  pdfButtonText: {
    color: "#265C8E",
    fontWeight: "600",
  },
  pdfInfo: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
  },
  pdfInfoText: {
    color: "#265C8E",
    fontSize: 12,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#265C8E",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
