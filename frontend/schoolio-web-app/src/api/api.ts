import axios from 'axios';
import { apiBaseURL } from "../env/env";

const apiClient = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
    params: { title, content },
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