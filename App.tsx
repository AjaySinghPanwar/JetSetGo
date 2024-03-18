import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navigation from './src/navigation';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        {/* Status Bar */}
        <StatusBar barStyle={'default'} />

        {/* Navigation */}
        <Navigation />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
