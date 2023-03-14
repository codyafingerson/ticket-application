import axios from "axios";

const templateUrl = "/api/templates";

const createTemplate = async (templateData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(`${templateUrl}`, templateData, config);

    return response.data;
}

const getTemplates = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${templateUrl}`, config);

    return response.data;
}

const getTemplateById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${templateUrl}/${id}`, config);

    return response.data;
}

const updateTemplate = async (id, templateData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(`${templateUrl}/${id}`, templateData, config);

    return response.data;
}

const deleteTemplate = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(`${templateUrl}/${id}`, config);

    return response.data;
}

const templateService = {
    createTemplate,
    getTemplates,
    getTemplateById,
    updateTemplate,
    deleteTemplate,
};

export default templateService;