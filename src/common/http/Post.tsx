import Http from './HttpService';

class HttpPost extends Http {
  async getMyPost(createdBy: string, query = '') {
    return await this.post('', `${this.url}/${createdBy}?${query}`);
  }
}

export default new HttpPost('posts');
