import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Cart from '../cart';
import Home from '../home';

const Main = createNativeStackNavigator();

export function MainStack(props) {
  return (
    <Main.Navigator
      gesturesEnabled={false}
      screenOptions={{headerShown: false}}>
      <Main.Screen name={'Home'} component={Home} headerMode="none" />
      <Main.Screen name={'Cart'} component={Cart} headerMode="none" />
    </Main.Navigator>
  );
}
