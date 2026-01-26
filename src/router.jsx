import { createBrowserRouter} from 'react-router-dom';
import Queue from './pages/queue/Queue';
import Layout from './Layout/Layout';
import Home from './pages/home/Home';

export const Myrouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/queue',
        element: <Queue />
      }
    ]
  }
]);
