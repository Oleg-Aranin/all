import React from 'react';
import {NavBar} from "./components/NavBar";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {TodosPage} from "./pages/TodosPage";
import {AboutPage} from "./pages/AboutPage";


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <div className="container">
                <Switch>
                    <Route component={TodosPage} path='/' exact/>
                    <Route component={AboutPage} path='/about'/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
