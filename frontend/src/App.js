import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Landingpage from './Components/Landingpage';
import Home from './Components/Home';
import Allroutes from './Components/Allroutes';
import Footer from './Components/Footer';


function App() {
  return (
    <div>
      <Navbar />
      <Allroutes />
      <Footer />
    </div>
  );
}

export default App;
