import { useState, useEffect } from 'react';
import materialsService from '../services/materialsService';

const usePlates = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const data = await materialsService.getAllPlates();
                setMaterials(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterials();
    }, []);

    
    const createPlate = async (newMaterialData) => {
        try {
            setLoading(true);
            const newMaterial = await materialsService.createPlates(newMaterialData);
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updatePlate = async (newMaterialData) => {
       
        try {
            setLoading(true);
            const newMaterial = await materialsService.updatePlates(newMaterialData);
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { materials, createPlate, loading, error, updatePlate };
};

export default usePlates;
