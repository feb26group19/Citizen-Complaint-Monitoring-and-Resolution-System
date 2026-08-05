import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SubmitEvent = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [locations, setLocations] = useState([]);
    const [formData, setFormData] = useState({
        date: '',
        lid: '',
        areaDetail: '',
        eventText: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch Locations
    useEffect(() => {
        const fetchLocationsFromDB = async () => {
            try {
                const response = await axios.get('http://localhost:8082/location/all');
                setLocations(response.data);
            } catch (err) {
                console.error('Failed to load locations from database:', err);
                setError('Could not load locations from database. Please check backend connection.');
            }
        };

        fetchLocationsFromDB();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        const ngoId = user?.ngoId;

        if (!ngoId) {
            setError("NGO ID not found. Please login again.");
            return;
        }

        if (!formData.lid) {
            setError("Please select a location.");
            return;
        }

        // Future date validation
        const selectedDate = new Date(formData.date);
        const currentDate = new Date();

        if (selectedDate < currentDate) {
            setError("Past date is not allowed. Please select the current or a future date.");
            return;
        }

        const payload = {
            ngoId: ngoId,
            date: formData.date,
            lid: Number(formData.lid),
            areaDetail: formData.areaDetail,
            eventText: formData.eventText
        };

        console.log("Payload :", payload);

        try {
            await axios.post("http://localhost:8083/events", payload);

            setSuccess("Event created successfully!");

            setFormData({
                date: '',
                lid: '',
                areaDetail: '',
                eventText: ''
            });

            setTimeout(() => navigate("/ngo"), 1500);

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Failed to create event."
            );
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '600px' }}>
            <div className="card shadow-sm p-4">
                <h2 className="mb-4">Create New Event</h2>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>

                    {/* Event Date */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">
                            Event Date & Time
                        </label>

                        <input
                            type="datetime-local"
                            name="date"
                            className="form-control"
                            value={formData.date}
                            onChange={handleChange}
                            min={new Date().toISOString().slice(0, 16)}
                            required
                        />
                    </div>

                    {/* Location */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">
                            Select Location
                        </label>

                        <select
                            name="lid"
                            className="form-select form-control"
                            value={formData.lid}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Select Location --</option>

                            {locations.map((loc) => (
                                <option
                                    key={loc.lid || loc.id}
                                    value={loc.lid || loc.id}
                                >
                                    {loc.lname || loc.locationName || loc.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Area Detail */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">
                            Area Detail
                        </label>

                        <input
                            type="text"
                            name="areaDetail"
                            className="form-control"
                            maxLength={40}
                            placeholder="e.g. Sector 5 Community Center"
                            value={formData.areaDetail}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Event Title */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">
                            Event Description / Title
                        </label>

                        <input
                            type="text"
                            name="eventText"
                            className="form-control"
                            maxLength={40}
                            placeholder="e.g. Tree Plantation Drive"
                            value={formData.eventText}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Create Event
                    </button>

                </form>
            </div>
        </div>
    );
};

export default SubmitEvent;