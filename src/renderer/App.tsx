import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const Home = () => {
  return (
    <div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
