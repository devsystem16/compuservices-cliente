import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NuevoCliente from './Components/NuevoCliente'
import EditarCliente from './Components/EditarCliente'
import Login from './SignInSide'
import Menu from './Components/Menu'
// import Index from './ui'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId:0
    }
  }

//   componentWillUnmount() {
//     clearInterval(this.state.intervalId)
// }

 
  componentDidMount() {

    
  }

  render() {
    return (
      <Router>
        <Switch>
          {/* <Route exact path ="/" component ={Index}></Route> */}
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/nuevo-cliente" component={NuevoCliente}></Route>
          <Route exact path="/editar-cliente" component={EditarCliente}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/Menu" component={Menu}></Route>
          <Route exact path="/ordenes" component={Menu}></Route>
          <Route exact path="/ordenesgarantia" component={Menu}></Route>

          <Route exact path="/clientes" component={Menu}></Route>
          <Route exact path="/usuarios" component={Menu}></Route>

          <Route exact path="/formularioNuevaOrden" component={Menu}></Route>


        </Switch>
      </Router>
    );
  }
}

export default App;

