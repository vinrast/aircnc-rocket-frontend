import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import camera from '../../assets/camera.svg';
import './style.css';

export default function New({history}){
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [price, setPrice] = useState('');
    const [techs, setTechs] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        const data = new FormData();
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('price', price);
        data.append('techs',techs);

        await api.post('/create', data, {
            headers:{
                user_id: localStorage.getItem('user')
            }
        });
        
        history.push('/dashboard');
    }

    const preview = useMemo(() => {
        return thumbnail? URL.createObjectURL(thumbnail):null;
    }, [thumbnail])


    return (
        <form onSubmit={ handleSubmit }>
            <label 
                id="thumbnail" 
                style={{ backgroundImage:`url(${preview})` }}
                className={ thumbnail ? 'has-thumbnail':'' }
            >
                <input 
                    type="file"
                    onChange={event => setThumbnail(event.target.files[0])}
                />
                <img src={camera} alt="Camera icon"/>
            </label>

            <label htmlFor="company">Empresa*</label>
            <input type="text"
                id="company"
                placeholder="Sua empresa incrivel"
                value= { company }
                onChange={ event => setCompany(event.target.value) }
            />
            <label htmlFor="price">Precio* <span>(em branco para GRATUITO)</span></label>
            <input type="text"
                id="price"
                placeholder="price"
                value= { price }
                onChange={ event => setPrice(event.target.value) }
            />
            <label htmlFor="techs">Tecnologias*<span>(separadas por virgula)</span></label>
            <input type="text"
                id="techs"
                placeholder="Quais tecnologias usam?"
                value= { techs }
                onChange={ event => setTechs(event.target.value) }
            />
            <button className="btn">
                Cadastrar Nova Empresa
            </button>
        </form>
    )
}