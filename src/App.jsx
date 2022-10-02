import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchPage, PokemonInfoPage, LoginPage } from '@atomic';
import { useToken } from '@utils';

function App() {
  const { token, setToken, setUser, clearToken } = useToken();

  if (!token) {
    return <LoginPage setToken={setToken} setUser={setUser} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage logout={clearToken} />} />
        <Route path="pokemon" element={<PokemonInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
