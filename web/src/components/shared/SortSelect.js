import React from 'react'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Row, Col } from 'react-bootstrap';
import jss from 'jss';

import preset from 'jss-preset-default'

jss.setup(preset());

const styles = {
  selectInput: {
    marginRight: '10px'
  },
  searchInput: {
    paddingTop: '6px',
    paddingLeft: '10px',
  },
  searchButton: {
    padding: '5px',
    float: 'right'
  }
}

const { classes } = jss.createStyleSheet(styles).attach();


const SortSelect = (props) => {

  const handleChange = name => event => {
    props.onChange(name, event.target.value);
  };

  const { sort, order } = props;

  return (
    <Row>
      <Col md={3}>

        <NativeSelect
          className={classes.selectInput}
          value={sort}
          onChange={handleChange('sort')}
        >
          <option value="">Sort list</option>
          <option value='rate'>By rating</option>
          <option value='price'>By price</option>
          <option value='address'>By address</option>
          <option value='requests'>By popularity</option>
        </NativeSelect>
        <NativeSelect
          className={classes.selectInput}
          value={order}
          onChange={handleChange('order')}>
          <option value={'asc'}>Asc</option>
          <option value={'desc'}>Desc</option>
        </NativeSelect>
      </Col>
      <Col md={{ span: 3, offset: 6 }}>
        <Paper className={classes.searchInput}>
          <InputBase
            onChange={handleChange('query')}
            placeholder="Search services"
          />
          <IconButton className={classes.searchButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Col>
    </Row>
  )
}

export default SortSelect
