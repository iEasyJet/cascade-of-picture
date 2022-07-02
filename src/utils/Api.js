class Api {  constructor(config) {
    this.Base_URL = config.url;
  }
  // Анализирование ответа
  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`Произошла ошибка со статус-кодом ${res.status}`)
    );
  }
  getPictures() {
    return fetch(this.Base_URL).then((res) => this._parseResponse(res));
  }
}

const configApi = {
  url: 'https://picsum.photos/v2/list?page=2&limit=100&json=true',
};

const api = new Api(configApi);

export default api;
