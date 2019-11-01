import React from 'react'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Row, Col } from 'react-bootstrap';

const SortSelect = (props) => {

  const handleChange = name => event => {
    props.onChange(name, event.target.value);
  };

  const { sort, order } = props;

  return (
    <Row>
      <Col md={3}>
        <NativeSelect
          style={{ backgroundColor: "white" }}
          className="select-input"
          value={sort}
          onChange={handleChange('sort')}
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
          onChange={handleChange('order')}>
          <option value={'asc'}>Asc</option>
          <option value={'desc'}>Desc</option>
        </NativeSelect>
      </Col>
      <Col md={{ span: 3, offset: 6 }}>
        <Paper>
          <InputBase
            onChange={handleChange('query')}
            style={{ paddingTop: 6, paddingLeft: 10 }}
            placeholder="Search services"
          />
          <IconButton style={{ padding: 10 }} className="float-right" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Col>
    </Row>
  )
}

export default SortSelect
