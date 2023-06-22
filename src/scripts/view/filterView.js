import View from './View';

class FilterView extends View {
  _parentElement = document.querySelector('.filter__list');
  _sectionElement = document.querySelector('.filter');
  _clearButton = document.querySelector('.filter__clear');

  addHandlerDelete(handler) {
    this._parentElement.addEventListener('click', evt => {
      const button = evt.target.closest('.filter__delete');
      if (!button) return;
      const feature = button.closest('.filter__item');
      handler(feature.dataset.name);
    });
  }

  addHandlerClear(handler) {
    this._clearButton.addEventListener('click', evt => {
      const button = evt.target;
      handler();
      button.blur();
      this.hideFilter();
    });
  }

  _generateMarkup(filter) {
    return `
      <li class="filter__item" data-name="${filter}">
        <span class="filter__text">${filter}</span>
        <button class="filter__delete" type="button">
          <span class="sr-only">Remove item</span>
        </button>
      </li>
    `;
  }

  showFilter() {
    this._sectionElement.classList.remove('filter--hidden');
  }

  hideFilter() {
    this._sectionElement.classList.add('filter--hidden');
  }
}

export default new FilterView();
