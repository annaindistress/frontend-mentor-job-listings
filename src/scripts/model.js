import { getJSON } from './helpers';

export const state = {
  jobs: [],
  filters: [],
  filteredJobs: [],
};

const createJobObject = function (data) {
  const imageName = data.logo.replace('./images/', '').replace('.svg', '');
  return {
    id: data.id,
    company: data.company,
    logo: new URL(`../assets/${imageName}.svg`, import.meta.url).href,
    new: data.new,
    featured: data.featured,
    position: data.position,
    role: data.role,
    level: data.level,
    postedAt: data.postedAt,
    contract: data.contract,
    location: data.location,
    languages: data.languages,
    tools: data.tools,
  };
};

export const loadJobs = async function () {
  try {
    const data = await getJSON('./data.json');
    state.jobs = data.map(createJobObject);
  } catch (error) {
    console.error(error);
  }
};

export const addFilter = function (filter) {
  state.filters.push(filter);
  state.filteredJobs = filterJobs();
};

export const removeFilter = function (filter) {
  const index = state.filters.findIndex(item => item === filter);
  state.filters.splice(index, 1);
  state.filteredJobs = filterJobs();
};

export const clearFilters = function () {
  state.filters = [];
  state.filteredJobs = [];
};

const filterJobs = () => {
  const filtered = state.jobs.filter(job => {
    const features = [job.role, job.level, ...job.languages, ...job.tools];
    return state.filters.every(filter => features.includes(filter));
  });
  return filtered;
};
