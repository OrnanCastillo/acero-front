import { useState, useEffect } from 'react';
import materialsService from '../services/materialsService';

const useHistorial = () => {
    const [historial, setHistorial] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const data = await materialsService.getMovementsHistorial();
                setHistorial(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistorial();
    }, []);

    return { historial, loading, error };
};

export default useHistorial;
