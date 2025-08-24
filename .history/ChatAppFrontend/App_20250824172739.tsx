// // App.tsx
// import React, { useContext } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // Context Providers
// import { AuthContext, AuthProvider } from './src/context/AuthContext.js';
// import { SocketProvider } from './src/context/SocketContext.js';

// // Screens
// import LoginScreen from './src/screens/LoginScreen.jsx';
// import RegisterScreen from './src/screens/RegisterScreen.jsx';
// import HomeScreen from './src/screens/HomeScreen.jsx';
// import ChatScreen from './src/screens/ChatScreen.jsx';

// const Stack = createNativeStackNavigator();

// /**
//  * Navigation based on auth status
//  */
// const AppNavigator = () => {
//   const { user, isLoading } = useContext(AuthContext); // Correct

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {user ? (
//           <>
//             <Stack.Screen name="Home" component={HomeScreen} />
//             <Stack.Screen name="Chat" component={ChatScreen} />
//           </>
//         ) : (
//           <>
//             <Stack.Screen
//               name="Login"
//               component={LoginScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen name="Register" component={RegisterScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// /**
//  * Root App Component
//  */
// const App = () => {
//   return (
//     <AuthProvider>
//       <SocketProvider> {/* 👈 Wrap your navigator with SocketProvider */}
//         <AppNavigator />
//       </SocketProvider>
//     </AuthProvider>
//   );
// };

// export default App;

import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext, AuthProvider } from './src/context/AuthContext.js';
import { SocketProvider } from './src/context/SocketContext.js';
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginScreen from './src/screens/LoginScreen.jsx';
import RegisterScreen from './src/screens/RegisterScreen.jsx';
import HomeScreen from './src/screens/HomeScreen.jsx';
import ChatScreen from './src/screens/ChatScreen.jsx';
import SettingsScreen from './src/screens/SettingsScreen.jsx';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // Screens accessible after login
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={({ navigation }) => ({
                title: 'WeChat', // Changed title
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Icon name="menu" size={30} color="#000" style={{ marginRight: 10 }} />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen 
              name="Chat" 
              component={ChatScreen}
              options={({ route }) => ({
                title: route.params.username,
                headerBackTitleVisible: false,
              })} 
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        ) : (
          // Screens for authentication
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppNavigator />
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;