import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faDollarSign, faBroom, faSpinner, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import Rating from '@material-ui/lab/Rating';
import AddressMap from '../shared/AddressMap';
import { fetchCompany, addReview, fetchReviews } from '../../store/actions/companyActions'
import ReviewForm from '../shared/ReviewForm';
import LoginFirst from '../shared/LoginFirst';
import Review from '../shared/Review';

class CompanyPage extends React.Component {

  componentDidMount() {
    const companyId = this.props.match.params.id;
    this.props.fetchCompany(companyId);
    this.props.fetchReviews(companyId);
  }

  submitReview = (review) => {
    review.serviceId = this.props.company.id;
    review.created = new Date();
    review.userId = this.props.user.id;
    this.props.addReview(review);
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
            <Col xs={12} md={4}>
              <Image className="company-profile-image" width="100%" src={company.logo ? company.logo : `https://picsum.photos/id/${company.id}/200/200?grayscale`} />
              <AddressMap address={company.address} coordinates={company.coordinates} />
            </Col>
            <Col xs={12} md={8}>
              {this.props.user && <Link to={`/order/${company.id}`} className="btn btn-primary float-right">Make order</Link>}
              <h1>{company.name} {this.props.user && <Link to={`/services/${company.id}/edit`} className="breadcrumb-item" style={{ fontSize: '0.6em' }}><FontAwesomeIcon icon={faPencilAlt} /></Link>}</h1>
              {company.address && <div><FontAwesomeIcon icon={faMapMarkerAlt} /> {company.address}</div>}
              <Rating
                name="customized-empty"
                value={company.rate}
                readOnly
                precision={0.1}
              />
              {company.price && <div><FontAwesomeIcon icon={faDollarSign} /> {company.price}</div>}
              {company.requests && <div><FontAwesomeIcon icon={faBroom} /> {company.requests} requests</div>}
              <p>{company.description}</p>

              {this.props.user ?
                <ReviewForm onSubmit={this.submitReview} /> :
                <LoginFirst message="You cannot add review or make order for this company." />}
              {this.props.reviews && this.props.reviews.length > 0 &&
                (
                  <>
                    <h4>Reviews:</h4>
                    {this.props.reviews.map((review) => <Review key={review.id} review={review} />)}
                  </>
                )
              }
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