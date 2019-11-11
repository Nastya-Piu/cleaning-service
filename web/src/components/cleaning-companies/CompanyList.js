import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { fetchCompanies } from '../../store/actions/companyActions';
import CompanyCard from './CompanyCard';
import { getCompaniesState } from '../../store/selectors/companySelector';
import SortSelect from '../shared/SortSelect';
import LoaderOrEmpty from '../shared/Loader';


class CompanyList extends React.Component {

  constructor(props) {
    super(props)
    this.currentPage = 1;
    window.onscroll = debounce(this.onScrollToBottom, 100);
  }

  onScrollToBottom = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      if (this.props.companies.length < 17) { // TODO: get initially length of all companies
        this.currentPage = ++this.currentPage;
        this.loadCompanies()
      }
    }
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  componentDidMount() {
    this.loadCompanies({ limit: 8 });
    window.navigator.geolocation.getCurrentPosition( // TODO: count distance between user coords and services coords
      (position) => {
        // position.coords.latitude
      },
      (err) => {
      }
    );
  }


  handleChange = (name, value) => {
    this.currentPage = 1;
    this.loadCompanies({ [name]: value })
  };

  loadCompanies = (paramsObj) => {
    this.props.fetchCompanies({ ...this.props.params, ...paramsObj, page: this.currentPage })
  }

  render() {
    const { sort, order, query } = this.props.params;
    if (this.props.error) {
      return <div className="text-danger">Sorry, there is server error</div>;
    }
    return (
      <>
        {this.props.user && <div className="text-center">
          <Link to="/services/new" className="btn btn-primary">Register company</Link>
        </div>}
        <SortSelect sort={sort} order={order} query={query} onChange={this.handleChange} />
        <div className="row">
          {this.props.companies.map(company => {
            return <CompanyCard key={company.id} company={company} />
          })}
        </div>
        {this.props.companies.length === 0 && <LoaderOrEmpty isLoading={!query} />}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    companies: getCompaniesState(state),
    params: state.companies.params,
    error: state.companies.error,
    user: state.auth.userInfo
  };
};

export default connect(mapStateToProps, { fetchCompanies })(CompanyList);