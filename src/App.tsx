import './App.css';
import AppLayout from './layouts/AppLayout';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/styles/style.css";
import "./assets/styles/fonts.css";
import { Suspense, lazy } from 'react';
import SuspensePage from './pages/SuspensePage';

const AppPage = lazy(() => import('./pages/AppPage'));
const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
      <BrowserRouter>
        <AppLayout>
          <Suspense fallback={<SuspensePage />}>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/app" element={<AppPage />} />
            </Routes>
            
          </Suspense>
        </AppLayout>
      </BrowserRouter>
  );
}

export default App;
