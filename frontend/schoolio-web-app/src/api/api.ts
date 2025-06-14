import axios from 'axios';
import {apiBaseURL} from "../env/env";
import {User} from "../components/Login/User";
import {NoteDTO} from "../components/Note/NoteDTO";

axios.defaults.withCredentials = true;

const apiClient = axios.create({
    baseURL: apiBaseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

function getUserId(): number {
    const user: User = JSON.parse(localStorage.getItem("user") || "null");
    return user.id;
}

// User API
export const getUsers = async () => {
    const response = await apiClient.get('/users');
    return response.data;
};

export const createUser = async (user: any) => {
    const response = await apiClient.post('/users', user);
    return response.data;
};

// Register API
export const registerUser = async (user: any) => {
    const response = await apiClient.post('/register', user);
    return response.data;
};

// News API
export const getAllNews = async () => {
    const response = await apiClient.get('/news');
    return response.data;
};

export const createArticle = async (title: string, content: string) => {
    const response = await apiClient.post('/news', null, {
        params: {title, content},
    });
    return response.data;
};

// Folder API
export const createFolder = async (folder: any) => {
    const response = await apiClient.post('/folders', folder);
    return response.data;
};

export const getFolderSubfolders = async (id: number) => {
    const response = await apiClient.get(`/folders/${id}/subfolders`);
    return response.data;
};

export const addSubFolder = async (id: number, subFolder: any) => {
    const response = await apiClient.post(`/folders/${id}/subfolders`, subFolder);
    return response.data;
};

export const getFolderById = async (id: number) => {
    const response = await apiClient.get(`/folders/${id}`);
    return response.data;
};

// Note API
export const uploadNote = async (id: number, note: any) => {
    const response = await apiClient.post(`/folder/${id}/notes`, note);
    return response.data;
};

export const getNoteById = async (id: number) => {
    const response = await apiClient.get(`/notes/${id}`);
    return response.data;
};

export const deleteNoteById = async (id: number) => {
    const response = await apiClient.delete(`/notes/${id}`);
    return response.data;
};

export const getAllNotes = async () => {
    const response = await apiClient.get('/notes/all');
    return response.data;
};

export const getUserFavoriteNotes = async () => {
    const response = await apiClient.get(`/users/${getUserId()}/notes`);
    return response.data;
};

export const loginUser = async (data: any) => {
    const response = await apiClient.post(`/auth/login`, data)
    return response;
};

export const removeFavoriteNote = async (noteId: number) => {
    const response = await apiClient.delete(`/users/${getUserId()}/notes/${noteId}`)
    return response;
}

export const addFavoriteNote = async (note: NoteDTO) => {
    const response = await apiClient.post(`/users/${getUserId()}/notes`, JSON.stringify(note))
    return response;
}

export const logout = async () => {
    const response = await apiClient.post(`/auth/logout`);
    return response;
}