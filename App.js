import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { ScanFace } from 'lucide-react-native';

const MOCK_DB = [
  { id: 1, name: "Sofia", seed: "sofia1" },
  { id: 2, name: "Valentina", seed: "valen22" },
];

export default function App() {
  const [step, setStep] = useState('home');
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (step === 'home') {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#000000', '#1e3a8a']} style={styles.bg} />
        <Text style={styles.title}>4 PAREDES</Text>
        <TouchableOpacity style={styles.btn} onPress={() => setStep('app')}>
          <Text style={styles.btnText}>ENTRAR AL MUNDO</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Parte Superior: Usuario Remoto */}
      <View style={styles.half}>
        <Image 
          source={{ uri: `https://api.dicebear.com/7.x/avataaars/png?seed=${MOCK_DB[0].seed}` }} 
          style={styles.img} 
        />
        <View style={styles.badge}><Text style={styles.badgeTxt}>CONECTADO: {MOCK_DB[0].name}</Text></View>
      </View>

      {/* Parte Inferior: Tú */}
      <View style={styles.half}>
        {hasPermission ? 
          <Camera style={styles.cam} type={Camera.Constants.Type.front}>
             <View style={[styles.badge, {top: undefined, bottom: 20}]}>
               <Text style={styles.badgeTxt}>TÚ</Text>
             </View>
          </Camera> 
          : <Text style={{color:'white'}}>Sin permiso de cámara</Text>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  bg: { position: 'absolute', width: '100%', height: '100%' },
  title: { fontSize: 40, color: 'white', fontWeight: 'bold', marginBottom: 40 },
  btn: { backgroundColor: '#2563eb', padding: 15, borderRadius: 10, marginTop: 20 },
  btnText: { color: 'white', fontWeight: 'bold' },
  half: { flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: '#333' },
  img: { width: '100%', height: '100%' },
  cam: { flex: 1, width: '100%' },
  badge: { position: 'absolute', top: 20, backgroundColor: 'rgba(0,0,0,0.6)', padding: 8, borderRadius: 8 },
  badgeTxt: { color: 'white', fontWeight: 'bold' }
});
