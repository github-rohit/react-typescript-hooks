import axios from 'axios';
import Http from './HttpService';

class HttpUser extends Http {
  async login(data: any) {
    try {
      const response = await axios.post(`${this.url}/login`, data);
      return await response.data;
    } catch (ex) {
      return ex.data;
    }
  }

  async signup(data: any) {
    try {
      const response = await axios.post(`${this.url}/login`, data);
      return await response.data;
    } catch (ex) {
      return null;
    }
  }

  async password(data: any) {
    try {
      const response = await axios.post(`${this.url}/password`, data);
      return await response.data;
    } catch (ex) {
      if (ex.status === 400) {
        return ex.data;
      }
      return null;
    }
  }

  async logout() {
    try {
      const response = await axios.post(`${this.url}/logout`);
      return await response.data;
    } catch (ex) {
      return null;
    }
  }
}

export default new HttpUser('user');
