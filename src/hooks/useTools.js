import { useState, useEffect } from 'react';
import toolsService from '../services/toolsService';

const useTools = () => {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const data = await toolsService.getAllTools();
                setTools(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTools();
    }, []);

    const createTool = async (newToolData) => {
        try {
            setLoading(true);
            const newTool = await toolsService.createTool(newToolData);
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateTool = async (newToolData) => {
        try {
            setLoading(true);
            const newTool = await toolsService.updateTool(newToolData);
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { tools, loading, error, createTool, updateTool};
};

export default useTools;
