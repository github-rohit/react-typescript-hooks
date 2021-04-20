import axios from 'axios';
import Auth from '../AuthService';

axios.interceptors.request.use((request: any) => {
  const { token } = Auth;

  if (token) {
    request.headers['x-Auth'] = token;
  }

  return request;
});

axios.interceptors.response.use(undefined, (error: any) => {
  return Promise.reject(error.response);
});

abstract class HttpService {
  url: string;

  constructor(url: string) {
    this.url = `http://localhost:3000/api/${url}`;
  }

  async get(params?: any) {
    try {
      const response = await axios.get(this.url, {
        params,
      });
      return response.data;
    } catch (ex) {
      return ex;
    }
  }

  async getById(id: string) {
    try {
      const response = await axios.get(`${this.url}/${id}`);
      return await response.data;
    } catch (ex) {
      return null;
    }
  }

  async post(data: any, url = this.url) {
    try {
      const response = await axios.post(`${url}`, data);
      return await response.data;
    } catch (ex) {
      return ex;
    }
  }

  async patch(id: string, data: any, url = this.url) {
    try {
      const response = await axios.patch(`${url}/${id}`, data);
      return await response.data;
    } catch (ex) {
      return ex;
    }
  }

  async delete(id: string, url = this.url) {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return await response.data;
    } catch (ex) {
      return ex;
    }
  }
}

export default HttpService;
