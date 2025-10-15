import { useState, useEffect } from 'react';
import materialsService from '../services/materialsService';

const useMaterials = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const data = await materialsService.getAllMaterials();
                setMaterials(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterials();
    }, []);

    const createMaterial = async (newMaterialData) => {
        try {
            setLoading(true);
            const newMaterial = await materialsService.createMaterial(newMaterialData);
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateMaterial = async (newMaterialData) => {
       
        try {
            setLoading(true);
            const newMaterial = await materialsService.updateMaterial(newMaterialData);
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { materials, loading, error, createMaterial, updateMaterial };
};

export default useMaterials;
