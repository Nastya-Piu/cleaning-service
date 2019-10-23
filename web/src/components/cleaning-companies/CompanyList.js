import React from 'react';
import { fetchCompanies } from '../../store/actions';
import { connect } from 'react-redux';
import CompanyCard from './CompanyCard';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import NativeSelect from '@material-ui/core/NativeSelect';

class CompanyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { companies: [], sort: '' };
  }

  componentDidMount() {
    this.props.fetchCompanies();
  }

  searchServices = query => {
    this.props.fetchCompanies({ query: query.target.value });
    // set fetch params in store
  }

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.value});
    this.props.fetchCompanies({sort: event.target.value})
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-3" style={{padding: 0}}>
          <NativeSelect
              value={this.state.sort}
              onChange={this.handleChange('sort')}
              name="sort"
              inputProps={{ 'aria-label': 'sort' }}
            >
              <option value="">Sort list</option>
              <option value={'rate'}>By rating</option>
              <option value={'price'}>By price</option>
              <option value={'address'}>By address</option>
              <option value={'requests'}>By popularity</option>
            </NativeSelect>
          </div>
          <Paper className="col-md-3 offset-md-6" style={{padding: '2px 4px'}}>
            <IconButton style={{padding: 10}} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              onChange={this.searchServices}
              placeholder="Search services"
              inputProps={{ 'aria-label': 'Search services' }}
            />
            <IconButton style={{padding: 10}} className="float-right" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <br/>
        <div className="row">
          { this.props.companies.map(company => {
            return <CompanyCard key={company.id} company={company} />
          }) }
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return { companies: Object.values(state.companies) };
};

export default connect(mapStateToProps, { fetchCompanies })(CompanyList);