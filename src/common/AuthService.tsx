import jwtDecode from 'jwt-decode';

class AuthService {
  tokenKey = 'x-token';

  get user(): {
    email: string;
    exp: number;
    iat: number;
    name: string;
    _id: string;
  } | null {
    try {
      const jwt = this.token;
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  }

  get token() {
    return localStorage.getItem(this.tokenKey) || '';
  }

  set token(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}

export default new AuthService();
