import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png';

export default function Login() {
    const history = useHistory();
    const location = useLocation();

    const [id, setId] = useState('');

    useEffect(() => {
        if (location.state && location.state.id) {
            setId(location.state.id);
        }
    }, [location]);

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            const { name } = response.data;

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', name);

            history.push('/profile')
        } catch (err) {
            alert('Falha no login, tente novamente');
        }
    }

    return (
        <div className="login-container">
            <section className="form" onSubmit={handleLogin}>
                <img src={logoImg} alt="Be The Hero" />
                <form>
                    <h1>Faça seu login</h1>

                    <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não Tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}
