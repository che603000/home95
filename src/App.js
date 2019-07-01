import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import {Container, Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

import Watering from './pages/watering';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


function App() {
    return (
        <Provider store={store}>
            <Container>
                <Router>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home">Home №95</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Link to={"/home"} className={"nav-link"}>Полив</Link>
                                <Link to={"/link"} className={"nav-link"}>Link</Link>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <Link to={"/item1"} className={"dropdown-item"}>Item 1</Link>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            {/*<Form inline>*/}
                            {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>*/}
                            {/*    <Button variant="outline-info">Search</Button>*/}
                            {/*</Form>*/}
                        </Navbar.Collapse>
                    </Navbar>
                    <Switch>
                        <Route path='/home' component={Watering}/>
                    </Switch>
                    {/*<Watering index={4}/>*/}
                    {/*<Watering index={1} start={"04:00"} active={true}/>*/}
                    {/*<Watering index={2}/>*/}
                </Router>
            </Container>
        </Provider>
    );
}

export default App;
