import Singup from './components/Singup';
import { CookiesProvider } from 'react-cookie';
import {Route, Routes} from 'react-router-dom';
import Todo from './components/Todo';
import Singin from './components/Singin';
import Header from './components/Header';

const App = () => {

  return (
    <CookiesProvider>
      <Header user="Hey there ..!!" signUpOption="Log Out"/>
      <Routes>
        <Route exact path='/' element={<Singin />} />
        <Route exact path='/todo' element={<Todo />} />
        <Route exact path='/signup' element={<Singup />} />
      </Routes>
    </CookiesProvider>
  )
}

export default App;