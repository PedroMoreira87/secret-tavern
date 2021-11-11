import React from "react";
import NavBar from "../nav-bar/nav-bar";
import Header from "../header/header";
import './info.css';

export default function Info() {
    return (
        <div class="contact-body">
            <div class="contact-content">
                <h1>Description</h1> <br/>
                <span>Looking at geek culture market, we realised that it's a great niche, and many times this group feels the lack services adapted to them, something suited to their own world.</span> <br/><br/>
                <span>With that in mind, we created a gamified social network, planned to the geek public, with a fantastic style (fantastic meaning the fantastic genre), filled with references to the pop culture and with many features inspired on famous RPGs and video-games.</span><br/><br/><br/><br/><br/>
                <h1>Creators</h1> <br/>
                <li><a href="https://github.com/david-sds">David's Github</a></li> 
                <li><a href="https://github.com/PedroMoreira87">Pedro's Github</a></li>
            </div>
        </div>
    )
}
