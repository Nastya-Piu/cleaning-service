import React from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';


const CompanyCard = props => {
  const { company } = props;

  return (
    <div className="card col-md-3" style={{padding: 0}}>
      <img src={`https://picsum.photos/id/${company.id+Math.floor(Math.random() * Math.floor(100))}/200?grayscale`} width="100" className="card-img-top" alt={company.name}/>
      <div className="card-body">
        <h5 className="card-title">{company.name}</h5>
        <p className="card-text">{company.address}</p>
        <Rating
          name="customized-empty"
          value={company.rate}
          readOnly
          precision={0.1}
        /><br/>
        <a href="#" className="btn btn-primary">Order</a>
      </div>
    </div>
  )
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
}

export default CompanyCard;