import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import BuildPage from './pages/BuildPage'
import PreviewPage from './pages/PreviewPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/build" element={<BuildPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Route>
    </Routes>
  )
}