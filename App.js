import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  console.log("App starting with configured icons...");
  return (
    <SafeAreaProvider>
      <PaperProvider
        settings={{
          icon: (props) => <MaterialCommunityIcons {...props} />,
        }}
      >
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
