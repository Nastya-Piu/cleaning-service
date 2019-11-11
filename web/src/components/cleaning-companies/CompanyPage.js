import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faDollarSign, faBroom, faSpinner, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import Rating from '@material-ui/lab/Rating';
import AddressMap from '../shared/AddressMap';
import { fetchCompany, addReview, fetchReviews } from '../../store/actions/companyActions'
import ReviewForm from '../shared/ReviewForm';
import LoginFirst from '../shared/LoginFirst';
import Review from '../shared/Review';
import { getCompanyState } from '../../store/selectors/companySelector';
import { getRandomImage } from '../../utils/picture';

const CompanyImage = styled.img`
  border-radius: 4px;
  border: 4px solid black;
  box-shadow: 2px 2px 8px 1px #444;
  margin: 15px 0;
  width: 100%;
`

class CompanyPage extends React.Component {

  componentDidMount() {
    const companyId = this.props.match.params.id;
    this.props.fetchCompany(companyId);
    this.props.fetchReviews(companyId);
  }

  submitReview = (review) => {
    const { company, user } = this.props;
    this.props.addReview({ ...review, serviceId: company.id, userId: user.id, created: new Date() });
  }

  render() {

    if (!this.props.company) {
      return <div className="text-center"><FontAwesomeIcon icon={faSpinner} spin /></div>
    }

    const { id, name, logo, address, coordinates, price, requests, rate, description } = this.props.company;

    return (
      <>
        <div>
          <Breadcrumb>
            <Link to="/" className="breadcrumb-item">Home</Link>
            <Breadcrumb.Item active>{name}</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col xs={12} md={4}>
              <CompanyImage src={logo ? logo : getRandomImage(id)} />
              <AddressMap address={address} coordinates={coordinates} />
            </Col>
            <Col xs={12} md={8}>
              {this.props.user && <Link to={`/order/${id}`} className="btn btn-primary float-right">Make order</Link>}
              <h1>{name} {this.props.user && <Link to={`/services/${id}/edit`} className="breadcrumb-item" style={{ fontSize: '0.6em' }}>
                <FontAwesomeIcon icon={faPencilAlt} /></Link>}</h1>
              {address && <div><FontAwesomeIcon icon={faMapMarkerAlt} /> {address}</div>}
              <Rating
                name="customized-empty"
                value={rate}
                readOnly
                precision={0.1}
              />
              {price && <div><FontAwesomeIcon icon={faDollarSign} /> {price}</div>}
              {requests && <div><FontAwesomeIcon icon={faBroom} /> {requests} requests</div>}
              <p>{description}</p>

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
  company: getCompanyState(state),
  user: state.auth.userInfo,
  reviews: state.companies.reviews
})

export default connect(mapStateToProps, {
  fetchCompany, addReview, fetchReviews
})(CompanyPage);