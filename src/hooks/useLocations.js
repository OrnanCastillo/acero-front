import { useState, useEffect } from 'react';
import toolsService from '../services/toolsService';

const useLocations = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await toolsService.getLocations();
                setLocations(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    return { locations, loading, error};
};

export default useLocations;
