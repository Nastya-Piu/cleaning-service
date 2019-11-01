import { createSelector } from 'reselect'

const getCompanies = (state) => {
  return Object.values(state.companies.data);
}

export const getCompaniesState = createSelector(
  [getCompanies],
  (companies) => companies
)

const getCompany = state => {
  const company = state.companies.data[0];
  if (company && company.coordinates) {
    company.lat = company.coordinates[0];
    company.lng = company.coordinates[1]
  }
  return company;
}

export const getCompanyState = createSelector(
  [getCompany],
  (company) => company
)