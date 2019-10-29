import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { fetchCompany } from '../../store/actions/companyActions'
import { Breadcrumb, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faDollarSign, faBroom } from '@fortawesome/free-solid-svg-icons'
import Rating from '@material-ui/lab/Rating';

class CompanyPage extends React.Component {

  componentDidMount() {
    this.props.fetchCompany(this.props.match.params.id);
  }

  geocode = (ymaps) => {
    // ymaps.geocode(this.props.company.address)
    //   .then(result => this.setState({ position: result.geoObjects.get(0).geometry.getCoordinates() }))
  }

  render(){
    const { company } = this.props;
    return (
      <>
        { company &&
        <div>
          <Breadcrumb>
            <Link to="/">Home</Link>
          </Breadcrumb>
          <Row>
            <Col xs={4} md={4}>
              <Image className="company-profile-image" width="100%" src={`https://picsum.photos/id/${company.id}/200/200?grayscale`} />
              <YMaps>
                <div>

                  <Map defaultState={{ center: [53.900595, 27.559007], zoom: 10 }}>
                    <Placemark defaultGeometry={company.coordinates} />
                  </Map>
                </div>
              </YMaps>
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
            </Col>
          </Row>


        </div>}
      </>
    )
  }
};

const mapStateToProps = (state) => ({
  company: state.companies.data[0]
})

export default connect(mapStateToProps, {
  fetchCompany
})(CompanyPage);