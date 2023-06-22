export default class View {
  _data;

  render(data) {
    if (!data) return;
    this._data = data;
    const markup = this._data.map(item => this._generateMarkup(item)).join('');
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
