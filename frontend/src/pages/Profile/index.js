import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    useEffect(() => {
        api.get('incidents', { headers: { Authorization: ongId, } })
            .then(response => { setIncidents(response.data); })
    }, [ongId]);
    async function handleLogoff() {
        localStorage.clear();
        history.push('/');
    }
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, { headers: { Authorization: ongId, } });
            alert(`Deletado o incidente com id ${id}`);
            setIncidents(incidents.filter(incident => incident.id !== id));
            history.push('/');
            history.push('/profile');
        } catch (error) {
            alert('Ocorreu um erro na tentativa de excluir o incidente, tente novamente.');
            history.push('/');
            history.push('/profile');
        }
    }

    return (
        <div className='profile-container'>
            <header>
                <img src={logoImg} alt='Be The Hero' />
                <span>Bem vindo, {ongName}</span>

                <Link className='button' to='/incidents/new'>Cadastrar novo caso</Link>
                <button type='button' onClick={handleLogoff}>
                    <FiPower size={18} color='#E02041' />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}