import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './Style.css';
import {Link} from 'react-router-dom';

export default function Dashboard(){
    
    useEffect(()=>{
        async function getSpots(){
           const response = await api.get('/show',{
                headers:{
                    user_id: localStorage.getItem('user')
                }
           });
           console.log(response.data);
           setSpots(response.data);
        }
        
        getSpots();
    }, []);

    const [spots, setSpots] = useState([]);
    
    return (
        <>
        <ul className="spot-list">
            {spots.map( spot => (
                <li key={spot._id}>
                    <header style={{ backgroundImage:`url(${spot.thumbnail_url})` }}/>
                    <strong>{spot.company}</strong>
                    <span>{ spot.price ? `R$${spot.price}/dia`: "GRATUITO" }</span>
                </li>
            ))}
        </ul>
        <Link to="/new">
            <button className='btn'>
                Cadastrar Novo Spot
            </button>
        </Link>
        </>
    )
}