import { useState, useEffect } from 'react';
import projectService from '../services/projectService';

const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectService.getAllProjects();
                setProjects(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const createProject = async (newProjectData) => {
        try {
            setLoading(true);
            const newProject = await projectService.createProject(newProjectData);
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateProject = async (newProjectData) => {
        try {
            setLoading(true);
            const newProject = await projectService.updateProject(newProjectData);
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const disableProject = async (id) => {
        try {
            setLoading(true);
            const newProject = await projectService.disableProject(id);
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { projects, loading, error, createProject, updateProject, disableProject};
};

export default useProjects;
