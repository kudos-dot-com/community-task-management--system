import React,{useState,useEffect} from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import collegeData from "../../utils/College";
function UserAccountDetails({ title , user }) {
  const [collegeDets,setCollegeDets]=useState({});
  useEffect(()=>{
    var FOUND = collegeData.Sheet1.find(function(post, index) {
      if(post.Name === user.college)
          return true;
  }
  );
if(FOUND)
{
    // setCollegeDets(FOUND);
    setCollegeDets(FOUND);
    console.log(FOUND)
}
  },[user])
  return(
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
            <h6 className="text-muted pb-1">Basic Information</h6>
              <Row form >
               {/* First Name */}
                <Col md="4" className="form-group">
                  <label htmlFor="feFirstName">Full Name</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="First Name"
                    value={user?user.name:""}
                    onChange={() => {}}
                  />
                </Col>
                {/* email */}
                <Col md="4" className="form-group">
                  <label htmlFor="feLastName">Email Address</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Last Name"
                    value={user?user.email:"No details"}
                    onChange={() => {}}
                  />
                </Col>
                {/* Number*/}
                <Col md="4" className="form-group">
                  <label htmlFor="feLastName">Contact Number</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Last Name"
                    value={user?user.number:"No details"}
                    onChange={() => {}}
                  />
                </Col>
                
              </Row>
              <Row form className="border-bottom">
                {/* Email */}
                <Col md="4" className="form-group">
                  <label htmlFor="feEmail">Date Of Birth</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    placeholder="Email Address"
                    value={user?user.dob:"No details"}
                    onChange={() => {}}
                    autoComplete="email"
                  />
                </Col>

              </Row>
              {/* <hr /> */}
              <h6 className="text-muted py-2">Address Information</h6>
              <Row form>
                {/* City */}
                <Col md="4" className="form-group">
                  <label htmlFor="feCity">Country</label>
                  <FormInput
                    id="feCity"
                    value={user?user.country:"No details"}
                    onChange={() => {}}
                  />
                </Col>
                {/* State */}
                <Col md="4" className="form-group">
                  <label htmlFor="feInputState">State</label>
                  <FormInput
                    id="festate"
                    value={user?user.state:"No details"}
                    onChange={() => {}}
                  />
                </Col>

                <Col md="4" className="form-group">
                  <label htmlFor="feInputState">City</label>
                  <FormInput
                    id="festate"
                    value={user?user.city:"No details"}
                    onChange={() => {}}
                  />
                  </Col>
                 {/* Residence0 0*/}
                 <Col md="6" className="form-group">
                  <label htmlFor="fePassword">Residence</label>
                  <FormInput
                    type="text"
                    id="fePassword"
                    placeholder="Password"
                    value={user?user.residence:"No details"}
                    onChange={() => {}}
                    autoComplete="current-password"
                  />
                </Col>  
                {/* Zip Code */}
                <Col md="4" className="form-group">
                  <label htmlFor="feZipCode">Zip</label>
                  <FormInput
                    id="feZipCode"
                    value={user && user.pin?user.pin:"No details"}
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              </Form>   
              {/*  */}         
          </Col>
        </Row>
        <Row>
        <h6 className="text-muted  ml-2 py-2">Education:</h6>
             <Col>
             <ListGroup flush>
              <Col md="12" className="form-group">
                  
                  <Row className="no-gutters">
                    <Col md="2" className="mt-1 d-flex justify-content-start">
                      <label className="" htmlFor="feZipCode">College Name</label>
                    </Col>
                 <Col md="6">
                  <FormInput
                    id="feZipCode"
                    className="d-block"
                    value={user && user.college?user.college:"ohters"}
                  />
                  </Col>
                  </Row>
                <br />
                {/*  college detils */}                  
                  <Row className="no-gutters">
                    <Col md="2" className="mt-1 d-flex justify-content-start">
                      <label className="d-block" htmlFor="feZipCode">Location</label>
                    </Col>
                 <Col md="6">
                  <FormInput
                    id="feZipCode"
                    className="d-block"
                    value={user && user.college && collegeDets?`${collegeDets.City}, ${collegeDets.State}, ${collegeDets.Country}`:"No Details"}
                  />
                  </Col>
                  </Row>
                  <br />
                {/*  college detils */}                  
                  <Row className="no-gutters">
                    <Col md="2" className="mt-1 d-flex justify-content-start">
                      <label className="d-block" htmlFor="feZipCode">Country Rank</label>
                    </Col>
                 <Col md="6">
                  <FormInput
                    id="feZipCode"
                    className="d-block"
                    value={user && user.college && collegeDets?`${collegeDets["Country Rank"]}`:"No Details"}
                  />
                  </Col>
                  </Row>
              </Col>
            </ListGroup>
             </Col>
        </Row>

        {/* socila media links */}
        <Row>
        <h6 className="text-muted  ml-2 py-2">Social Media:</h6>
             <div className="d-flex flex-wrap ml-3">
             {/* <ListGroup flush> */}
              <div md="4" className="form-group pr-5">
                  <label>Facebook</label>
                  <br />                  
                  <a href="">
                  <small>https://www.facebook.com/bhaskar.sengupta.140/</small> 
                  </a>
              </div>

              <div md="4" className="form-group pr-2">
                  <label>LinkedIn</label><br />
                  <a href="">
                  <small>https://www.facebook.com/bhaskar.sengupta.140/</small> 
                  </a>
              </div>

              <div md="4" className="form-group pr-2">
                  <label>Instagram</label><br />
                  <a href="">
                  <small>https://www.facebook.com/bhaskar.sengupta.140/</small> 
                  </a>
              </div>
            {/* </ListGroup> */}
             </div>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);
}
UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};

export default UserAccountDetails;
