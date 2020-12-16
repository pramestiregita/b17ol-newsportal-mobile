import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Root} from 'native-base';
import RNBootSplash from 'react-native-bootsplash';

import Main from './src/screens/Main';
import store from './src/redux/store';

export default function App() {
  useEffect(() => {
    RNBootSplash.show({});
  }, []);

  return (
    <Provider store={store().store}>
      <PersistGate loading={null} persistor={store().persistor}>
        <Root>
          <Main />
        </Root>
      </PersistGate>
    </Provider>
  );
}
