import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }){
    const [ email, setEmail ] = useState('');
    async function handleSubmit(e){
      e.preventDefault();
  
      const response = await api.post('/sessions',{
        email
      });
  
      const { _id } = response.data;
      localStorage.setItem('user',_id);
  
      history.push('/dashboard');
    }

    return (
        <>
            <p>
                Ofresca <strong>spots</strong> para programadores y contrate <strong>talento</strong> para su empresa
            </p>
            <form onSubmit={ handleSubmit }>
                <label htmlFor="email">Email *</label>
                <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    placeholder="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <button className="btn" type="submit">Enviar</button>
            </form>
        </>
    )
}