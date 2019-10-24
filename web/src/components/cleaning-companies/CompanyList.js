import React from 'react';
import { fetchCompanies } from '../../store/actions';
import { connect } from 'react-redux';
import CompanyCard from './CompanyCard';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import NativeSelect from '@material-ui/core/NativeSelect';

class CompanyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { companies: null, sort: '', query: '', order: 'asc' };
  }

  componentDidMount() {
    setTimeout(()=> {
      this.props.fetchCompanies();
    }, 1000);
  }

  searchServices = query => {
    this.setState({ ...this.state, query: query.target.value});
    this.props.fetchCompanies({ ...this.props.params, query: query.target.value });
  }

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.value});
    this.props.fetchCompanies({...this.props.params, [name]: event.target.value})
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
            &nbsp;&nbsp;
            <NativeSelect
              value={this.state.order}
              onChange={this.handleChange('order')}>
              <option value={'asc'}>Asc</option>
              <option value={'desc'}>Desc</option>
            </NativeSelect>
          </div>
          <Paper className="col-md-3 offset-md-6" style={{padding: '2px 4px'}}>
            <InputBase
              onChange={this.searchServices}
              style={{paddingTop: 6, paddingLeft: 10}}
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
        {this.props.companies.length === 0 && this.state.query === '' && <div className="ui active centered inline loader"></div>}
        {this.props.companies.length === 0  && this.state.query &&
          <div style={{color: '#555'}} className="text-center">
            <i style={{fontSize: '2.5em'}} class="searchengin icon"></i><br/>Sorry, not found
          </div>}
      </>
    )
  }
}

const mapStateToProps = state => {
  return { companies: Object.values(state.companies.data), params: state.companies.params };
};

export default connect(mapStateToProps, { fetchCompanies })(CompanyList);