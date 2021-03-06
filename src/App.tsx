
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Question from './Pages/Question/Question';
import Home from './Pages/Home/Home';

function App() {
  return (
    <div data-testid="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:language" element={<Question />} />
        </Routes>
      </BrowserRouter>

    </div>


  );
}

export default App;
