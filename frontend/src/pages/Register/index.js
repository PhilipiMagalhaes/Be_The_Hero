import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setuf] = useState('');
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        console.log(name, email, whatsapp, city, uf);
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };
        try {
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso é ${response.data.id}`);
            history.push('/');

        } catch (error) {
            alert(error);
        }
    }


    return (
        <div className='register-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt='Be the Hero' />

                    <p>
                        Faça seu cadastro, entre na plataforma e ajude pessoas a
                        econtrarem os casos da sua ONG.
            </p>

                    <Link className='back-link' to='/'>
                        <FiArrowLeft size={16} color='#E02041' /> Retornar
            </Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder='Nome da ONG'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        placeholder='E-mail'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        placeholder='Whatsapp'
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                    />

                    <div className='input-group'>
                        <input
                            placeholder='Cidade'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <input
                            placeholder='uf'
                            style={{ width: 80 }}
                            value={uf}
                            onChange={(e) => setuf(e.target.value)}
                        />

                    </div>

                    <button className='button' type='submit'>
                        Cadastrar
            </button>

                </form>

            </div>

        </div>
    );
}