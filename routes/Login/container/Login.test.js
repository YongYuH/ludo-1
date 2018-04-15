import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import shallowWithStore from '../../../__test__/shallowWithStore';
import ConnectedLogin from './Login';

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Login container', () => {
  it('', () => {
    const testState = {
      auth: {
        isLoggedIn: false,
      },
    };
    const store = mockStore(testState);
    const component = shallowWithStore(<ConnectedLogin />, store);
    expect(typeof component).toBe('object');
  });
});