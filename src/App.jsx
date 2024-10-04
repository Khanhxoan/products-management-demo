import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import getRouteList from './router';
import store, { persistor } from './stores/store';

function App() {
    // Check auth
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={getRouteList()} />
            </PersistGate>
        </Provider>
    );
}

export default App;
