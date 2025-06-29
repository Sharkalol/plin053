import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import NewCharacter from './pages/NewCharacter/NewCharacter';
import NoPage from './pages/NoPage/NoPage';
import ChooseStats from './pages/ChooseStats/ChooseStats';
import ChooseSkills from './pages/ChooseSkills/ChooseSkills';
import Character from './pages/Character/Character';
import Characters from './pages/Characters/Characters';
import ChoosePersonality from './pages/ChoosePersonality/ChoosePersonality';

const App = () => {
  const [count, setCount] = useState(0)

  const onPress = () =>{
    setCount((count) => count + 1)
  }

  const onPress2 = () =>{
    setCount((count) => count + 1)
  }

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/new_character" element={<NewCharacter />} />
        <Route path="/home" element={<Home />} />
        <Route path="/choose_stats/:id" element={<ChooseStats />} />
        <Route path="/choose_skills/:id" element={<ChooseSkills />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/choose_personality/:id" element={<ChoosePersonality />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
