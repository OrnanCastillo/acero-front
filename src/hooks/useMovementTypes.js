import { useState, useEffect } from 'react';
import materialsService from '../services/materialsService';

const useMovementsTypes = () => {
    const [movements, setMovements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovements = async () => {
            try {
                const data = await materialsService.getMovementsType();
                setMovements(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovements();
    }, []);


    return { movements, loading, error };
};

export default useMovementsTypes;
