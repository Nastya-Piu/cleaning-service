import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faDollarSign, faBroom, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Rating from '@material-ui/lab/Rating';
import AddressMap from '../shared/AddressMap';
import { fetchCompany, addReview, fetchReviews } from '../../store/actions/companyActions'
import ReviewForm from '../shared/ReviewForm';
import LoginFirst from '../shared/LoginFirst';

class CompanyPage extends React.Component {

  componentDidMount() {
    this.props.fetchCompany(this.props.match.params.id);
    this.props.fetchReviews(this.props.match.params.id);
  }

  submitReview = (review) => {
    console.log(review);
    review.serviceId = this.props.company.id;
    review.created = new Date();
    review.userId = this.props.user.id;
    this.props.addReview(review);
    this.props.fetchReviews(this.props.match.params.id);
  }

  render() {
    const { company } = this.props;

    if (!company) {
      return <div className="text-center"><FontAwesomeIcon icon={faSpinner} spin /></div>
    }

    return (
      <>
        <div>
          <Breadcrumb>
            <Link to="/" className="breadcrumb-item">Home</Link>
            <Breadcrumb.Item active>{company.name}</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col xs={4} md={4}>
              <Image className="company-profile-image" width="100%" src={`https://picsum.photos/id/${company.id}/200/200?grayscale`} />
              <AddressMap address={company.address} coordinates={company.coordinates} />
            </Col>
            <Col xs={8} md={8}>
              <h1>{company.name}</h1>
              <div><FontAwesomeIcon icon={faMapMarkerAlt} /> {company.address}</div>
              <Rating
                name="customized-empty"
                value={company.rate}
                readOnly
                precision={0.1}
              />
              <div><FontAwesomeIcon icon={faDollarSign} /> {company.price}</div>
              <div><FontAwesomeIcon icon={faBroom} /> {company.requests} requests</div>
              <p>{company.description}</p>

              {this.props.reviews && this.props.reviews.map(review => (
                <div key={review.id}>{review.title}</div>
              ))}

              {this.props.user ?
                (<><Link to={`/order/${company.id}`} className="btn btn-primary">Make order</Link> <ReviewForm onSubmit={this.submitReview} /></>) :
                <LoginFirst message="You cannot add review or make order for this company." />}


            </Col>
          </Row>
        </div>
      </>
    )
  }
};

const mapStateToProps = (state) => ({
  company: state.companies.data[0], user: state.auth.userInfo, reviews: state.companies.reviews
})

export default connect(mapStateToProps, {
  fetchCompany, addReview, fetchReviews
})(CompanyPage);