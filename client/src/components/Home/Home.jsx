import React from 'react';
import Navbar from '../navbar/Navbar'
import Hero from './Hero'
import './home.scss'

export default function Home() {
    return (
        <div className="homeContainer">
            <Navbar />
            <Hero />
        </div>
    )
}
