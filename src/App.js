import './App.css';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import './components/Nav/Nav.css';
import Footer from './components/Footer/Footer';
import Detail from './components/Detail/Detail';
import Contact from './components/Contact/Contact';
import News from './components/News/News';
import About from './components/About/About';
import CRUD from './components/CRUD';
import Edit from './components/CRUD/data/Edit';
import { Routes, Route } from "react-router-dom";
import NavMui from './components/Nav/NavMui';

function App() {
    // Check if 'userData' is not null in localStorage
    const userData = localStorage.getItem('userData');
    const shouldRenderCRUD = userData !== null;

    return (
        <div className='App'>
            {/* <Nav/> */}
            <NavMui />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/detail/:id' element={<Detail />}></Route>
                <Route path='/news' element={<News />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/contact' element={<Contact />}></Route>
                {shouldRenderCRUD && (
                    <>
                        <Route path='/crud' element={<CRUD />}></Route>
                        <Route path='/crud/edit/:id' element={<Edit />}></Route>
                    </>
                )}
            </Routes>
            {/* <Footer/> */}
        </div>
    );
}

export default App;
