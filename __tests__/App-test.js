import * as React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {render, screen, fireEvent} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import {store} from '../src/store';
import {MainStack} from '../src/navigation';
import Home from '../src/home';
import Cart from '../src/cart';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('render screen correctly', () => {
  test('Home', () => {
    const component = (
      <Provider store={store}>
        <NavigationContainer>
          <Home />
        </NavigationContainer>
      </Provider>
    );
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Cart', () => {
    const component = (
      <Provider store={store}>
        <NavigationContainer>
          <Cart />
        </NavigationContainer>
      </Provider>
    );
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Testing navigation between screens', () => {
  test('page contains the header and 4 items', async () => {
    const component = (
      <Provider store={store}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </Provider>
    );

    render(component);

    const header = await screen.findByText('Products');
    const items = await screen.findAllByText(/Add to Cart/);

    expect(header).toBeTruthy();
    expect(items.length).toBe(4);
  });

  test('clicking on one item to the cart and checkout to cart screen', async () => {
    const component = (
      <Provider store={store}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </Provider>
    );

    render(component);
    const toClick = await screen.findAllByText(/Add to Cart/);

    fireEvent(toClick[0], 'press');
    const checkoutClick = await screen.findByText('CHECKOUT');

    fireEvent(checkoutClick, 'press');
    const newHeader = await screen.findByText('Cart');
    const newBody = await screen.findByText(/Total/);

    expect(newHeader).toBeTruthy();
    expect(newBody).toBeTruthy();
  });
});
