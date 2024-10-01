import { RouterProvider } from 'react-router-dom';

import getRouteList from './router';

function App() {
    // Check auth
    return <RouterProvider router={getRouteList()} />;
}

export default App;
