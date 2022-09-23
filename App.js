import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './src/store';
import {Provider} from 'react-redux';
import {MainStack} from './src/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

