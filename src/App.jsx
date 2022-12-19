import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SearchPage, PokemonInfoPage, LoginPage } from '@atomic'
import { useToken } from '@utils'

function App() {
  const { token, savaToken, clearToken, user, savaUser } = useToken()

  if (!token) {
    return <LoginPage setToken={savaToken} setUser={savaUser} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <SearchPage
              clearToken={clearToken}
              user={user}
              savaToken={savaToken}
            />
          }
        />
        <Route path='pokemon' element={<PokemonInfoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
