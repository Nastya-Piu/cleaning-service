import { createSelector } from 'reselect'

const companySelector = state => {
  return state.companies.data;
}

const getCompanies = createSelector(
  companySelector,
  (companies) => Object.values(companies)
)

export const getCompaniesState = createSelector(
  [getCompanies],
  (companies) => companies
)

const getCompanySelector = createSelector(
  companySelector,
  company => company[0]
);

const getCompanyWithCoordinates = createSelector(
  getCompanySelector,
  company => {
    if (company && company.coordinates) {
      company.lat = company.coordinates[0];
      company.lng = company.coordinates[1]
    }
    return company;
  }
)

export const getCompanyState = createSelector(
  [getCompanyWithCoordinates],
  (company) => company
)