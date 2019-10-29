import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import NativeSelect from '@material-ui/core/NativeSelect';
import { fetchCompanies } from '../../store/actions/companyActions';
import CompanyCard from './CompanyCard';

class CompanyList extends React.Component {

  componentDidMount() {
    this.props.fetchCompanies();
  }

  handleChange = name => event => {
    this.props.fetchCompanies({...this.props.params, [name]: event.target.value})
  };

  render() {
    const { sort, order, query } = this.props.params;
    return (
      <>
        <div className="row">
          <div className="col-md-3" style={{padding: 0}}>
          <NativeSelect
              className="select-input"
              value={sort}
              onChange={this.handleChange('sort')}
              name="sort"
              inputProps={{ 'aria-label': 'sort' }}
            >
              <option value="">Sort list</option>
              <option value='rate'>By rating</option>
              <option value='price'>By price</option>
              <option value='address'>By address</option>
              <option value='requests'>By popularity</option>
            </NativeSelect>
            <NativeSelect
              className="select-input"
              value={order}
              onChange={this.handleChange('order')}>
              <option value={'asc'}>Asc</option>
              <option value={'desc'}>Desc</option>
            </NativeSelect>
          </div>
          <Paper className="col-md-3 offset-md-6" style={{padding: '2px 4px'}}>
            <InputBase
              onChange={this.handleChange('query')}
              style={{paddingTop: 6, paddingLeft: 10}}
              placeholder="Search services"
              inputProps={{ 'aria-label': 'Search services' }}
            />
            <IconButton style={{padding: 10}} className="float-right" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div className="row">
          { this.props.companies.map(company => {
            return <CompanyCard key={company.id} company={company}/>
          }) }
        </div>
        { this.props.companies.length === 0 && (query ?
          <div style={{color: '#555'}} className="text-center">
            <i style={{fontSize: '2.5em'}} className="searchengin icon"></i><br/>Sorry, not found
          </div> : <div className="ui active centered inline loader"></div>) }
      </>
    )
  }
}

const mapStateToProps = state => {
  return { companies: Object.values(state.companies.data), params: state.companies.params };
};

export default connect(mapStateToProps, { fetchCompanies })(CompanyList);