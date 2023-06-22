import View from './View';

class JobView extends View {
  _parentElement = document.querySelector('.jobs__list');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerFilter(handler) {
    this._parentElement.addEventListener('click', evt => {
      const button = evt.target.closest('.jobs__feature');
      if (!button) return;
      handler(button.dataset.feature);
      button.blur();
    });
  }

  _generateMarkup(job) {
    return `
      <li id="${job.id}">
        <article class="jobs__item ${
          job.featured ? 'jobs__item--featured' : ''
        }">
          <h3 class="jobs__title">
            <a class="jobs__title-link" href="#">${job.position}</a>
          </h3>
          <p class="jobs__company">${job.company}</p>
          <ul class="jobs__tags">
            ${job.new ? `<li class="jobs__tag jobs__tag--new">New!</li>` : ''}
            ${job.featured ? `<li class="jobs__tag">Featured</li>` : ''}
          </ul>
          <p class="jobs__info">
            <span class="jobs__info-item">${job.postedAt}</span>
            <span class="jobs__info-item">${job.contract}</span>
            <span class="jobs__info-item">${job.location}</span>
          </p>
          <hr class="jobs__separator">
          <ul class="jobs__features">
            ${this._generateMarkupFeature(job.role)}
            ${this._generateMarkupFeature(job.level)}
            ${job.languages
              ?.map(language => this._generateMarkupFeature(language))
              .join('')}
            ${job.tools
              ?.map(tool => this._generateMarkupFeature(tool))
              .join('')}
          </ul>
          <img class="jobs__logo" src="${job.logo}" alt="${job.company}" width="48" height="48">
        </article>
      </li>
    `;
  }

  _generateMarkupFeature(feature) {
    return `
      <li>
        <button class="jobs__feature" type="button" data-feature="${feature}">
          ${feature}
        </button>
      </li>
    `;
  }
}

export default new JobView();
