import * as model from './model';
import jobView from './view/jobView';
import filterView from './view/filterView';

const controlJobs = async function () {
  try {
    await model.loadJobs();
    jobView.render(model.state.jobs);
  } catch (error) {
    console.error(error);
  }
};

const controlFilters = function (filter) {
  if (model.state.filters.includes(filter)) {
    model.removeFilter(filter);
    if (model.state.filters.length < 1) {
      filterView.hideFilter();
      jobView.render(model.state.jobs);
      return;
    }
  } else {
    model.addFilter(filter);
  }
  filterView.render(model.state.filters);
  filterView.showFilter();
  jobView.render(model.state.filteredJobs);
};

const clearFilters = function () {
  model.clearFilters();
  filterView.render(model.state.filters);
  jobView.render(model.state.jobs);
};

const init = function () {
  jobView.addHandlerRender(controlJobs);
  jobView.addHandlerFilter(controlFilters);
  filterView.addHandlerDelete(controlFilters);
  filterView.addHandlerClear(clearFilters);
};

init();
