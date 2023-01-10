import { Switch, Route } from 'react-router-dom';
import './App.css';
import RegForm from './Components/RegistrationForm/RegForm';
import ListItems from './Components/ListItems/ListItems';
import Navbar from './Components/Navbar/Navbar';
import EditUser from './Components/EditeItem/EditUser';

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Switch>
        <Route exact path="/" component={RegForm} />
        <Route exact path="/listitems" component={ListItems} />
        <Route exact path="/edit/:id" component={EditUser} />
      </Switch>
    </div>
  );
}

export default App;
