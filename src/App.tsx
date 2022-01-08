
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Question from './Pages/Question/Question';
import Home from './Pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:language" element={<Question />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
