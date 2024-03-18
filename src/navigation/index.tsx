import React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import OnboardingScreen from './screens/Onboarding';
import {navigationConstants} from '../utils/navigationConstants';
import Home from './screens/Home';

const Navigation = () => {
  const Stack = createNativeStackNavigator<ParamListBase>();

  // Options for screens
  const options: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={options}>
        <Stack.Screen
          name={navigationConstants.onboarding_screen}
          component={OnboardingScreen}
        />
        <Stack.Screen name={navigationConstants.home_screen} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
