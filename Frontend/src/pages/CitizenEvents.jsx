import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CitizenEvents = () => {
    const { user } = useSelector((state) => state.auth);
    const [events, setEvents] = useState([]);
    const [userRegistrations, setUserRegistrations] = useState([]);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchEvents();
        if (user?.uid) {
            fetchUserRegistrations();
        }
    }, [user]);

    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:8083/api/events');
            setEvents(res.data);
        } catch (err) {
            console.error('Error fetching events:', err);
        }
    };

    const fetchUserRegistrations = async () => {
        try {
            const res = await axios.get(`http://localhost:8083/api/events/registrations/user/${user.uid}`);
            // Map array of registered event IDs for quick lookup
            const registeredEids = res.data.map((reg) => reg.eid);
            setUserRegistrations(registeredEids);
        } catch (err) {
            console.error('Error fetching registrations:', err);
        }
    };

    const handleRegister = async (eid) => {
        setMessage({ type: '', text: '' });

        const payload = {
            eid: eid,
            uid: user?.uid,
            regDate: new Date().toISOString().split('T')[0] // YYYY-MM-DD
        };

        try {
            await axios.post('http://localhost:8083/api/events/register', payload);
            setMessage({ type: 'success', text: 'Successfully registered for the event!' });
            setUserRegistrations([...userRegistrations, eid]);
        } catch (err) {
            setMessage({
                type: 'danger',
                text: err.response?.data || 'Failed to register for the event.'
            });
        }
    };

    return (
        <div className="container mt-4">
            <h2>Available NGO Events</h2>
            {message.text && (
                <div className={`alert alert-${message.type} mt-2`}>
                    {message.text}
                </div>
            )}

            <div className="row mt-3">
                {events.length === 0 ? (
                    <p>No events available right now.</p>
                ) : (
                    events.map((event) => {
                        const isRegistered = userRegistrations.includes(event.eid);
                        return (
                            <div className="col-md-4 mb-4" key={event.eid}>
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{event.eventText}</h5>
                                        <p className="card-text">
                                            <strong>Area:</strong> {event.areaDetail}<br />
                                            <strong>Date:</strong> {new Date(event.date).toLocaleString()}<br />
                                            <strong>NGO ID:</strong> {event.ngoId}
                                        </p>
                                        <button
                                            className={`btn ${isRegistered ? 'btn-secondary' : 'btn-success'} w-100`}
                                            onClick={() => handleRegister(event.eid)}
                                            disabled={isRegistered}
                                        >
                                            {isRegistered ? 'Registered' : 'Register Now'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default CitizenEvents;