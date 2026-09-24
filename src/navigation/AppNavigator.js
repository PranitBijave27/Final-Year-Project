import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import ResultScreen from '../screens/ResultScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#f7faf8' },
        headerTintColor: '#1a3d32',
        headerTitleStyle: { fontWeight: '700' },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          title: 'Retina Scanner',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Screening Result' }} />
      <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Records' }} />
    </Stack.Navigator>
  );
}
