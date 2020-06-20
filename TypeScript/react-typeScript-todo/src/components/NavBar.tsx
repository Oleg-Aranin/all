import React from "react";
import {NavLink} from "react-router-dom";

export const NavBar: React.FC = () => (
    <nav>
        <div className="nav-wrapper px1">
            <a href="/" className="brand-logo">React + TypeScript</a>
            <ul className="right hide-on-med-and-down">
                <li><NavLink to="/">Список дел</NavLink></li>
                <li><NavLink to="/about">Информация</NavLink></li>
            </ul>
        </div>
    </nav>
)
