import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faSadTear } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';
import { fetchCompanies } from '../../store/actions/companyActions';
import CompanyCard from './CompanyCard';
import { getCompaniesState } from '../../store/selectors/companySelector';
import SortSelect from '../shared/SortSelect';


class CompanyList extends React.Component {

  constructor(props) {
    super(props)
    this.currentPage = 1;
    window.onscroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        if (this.props.companies.length < 10) {
          this.currentPage = ++this.currentPage;
          this.loadCompanies()
        }
      }
    }, 100);
  }

  componentWillUnmount() {
    window.onscroll = () => {
      // do nothing TODO: make something with it!
    }
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
    this.props.fetchCompanies(Object.assign(this.props.params, paramsObj, { page: this.currentPage }));
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
        <div className="row" ref={(scrollableBox) => this.scrollableBox = scrollableBox}>
          {this.props.companies.map(company => {
            return <CompanyCard key={company.id} company={company} />
          })}
        </div>
        {this.props.companies.length === 0 && (query ?
          <div style={{ color: '#555' }} className="text-center">
            <FontAwesomeIcon icon={faSadTear} size="lg" />Sorry, not found
          </div> : <div className="text-center"><FontAwesomeIcon icon={faSpinner} spin /></div>)}
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