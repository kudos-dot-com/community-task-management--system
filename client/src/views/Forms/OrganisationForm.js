import React,{useEffect,useState} from "react";
import PropTypes from "prop-types";
import CountryData from '../../utils/CountryStateList'
import BaseUrl from '../../Api/Api' 
import {
  Alert,
  Container,
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

function OrganisationForm({ title }) {
  const [user,setuser]=useState(JSON.parse(localStorage.getItem('user')));
   const [state,setstate]=useState('');
   const [alertToggle,AlertToggle]=useState(false);
   const [alertMessage,SetAlertMessage]=useState("");
   const [submit,setsubmit]=useState('submit')
   const [countries,setallcountries]=useState([{}])
   const [selectCountry,setSelectedCountry]=useState("");
   const [allstates,setallstates]=useState([])
   const [role,setrole]=useState(["Non-Profit","Profit","Private","Public","College Group","unregistered","Others"]);
   const [type,setType]=useState('');
   const [endpoint,setendpoint]=useState("");
  //  const history = useHistory();
   const [data, SetData] = useState({
    name:"",
    email:"",
    password:"",
    website:"",
    number:"",
    city:"",
    facebook:"",
    linkedin:"",
    instagram:"",    
    description:"",
    scope:""
})
const handleChange = e =>{
    const name = e.target.name;
    const value = e.target.value;
    SetData(prev => ({
        ...prev, [name]: value
    }));
}

  useEffect(()=>{
  if(user) 
  {   user.role==="admin"?setendpoint("/admin-register-ca"):setendpoint("/org-register-ca"); 
  }
   setallcountries(CountryData.countries); 
  },[user])
useEffect(()=>{
    var FOUND = countries.find(function(post, index) {
        if(post.country === selectCountry)
            return true;
    }
    );
 if(FOUND)
 {
     setallstates(FOUND.states);
    // console.log(FOUND.states)
 }
},[selectCountry])

function onsubmit(e)
{ AlertToggle(false);
  setsubmit('loading...')
    e.preventDefault();
    // console.log(data.dob + data.name + data.email + data.password + data.description + data.residence + data.pin + data.number);
 if(!user){
   return ;
 }else{
    fetch(`${BaseUrl.userApi}/admin-register-org`,{
      method:"post",
      headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer "+localStorage.getItem("token")
      },
      body:JSON.stringify({
          password:data.password,
          email:data.email,
          name:data.name,
          website:data.website,
          number:data.number,
          state,
          country:selectCountry,
          type,
          city:data.city,
          facebook:data.facebook,
          linkedin:data.linkedin,
          instagram:data.instagram,
          description:data.description,
          scope:data.scope
      })
  })
  .then(res=>res.json())
  .then(data=>{
   console.log(data);
   setsubmit('submit');
   setTimeout(function(){ AlertToggle(true); SetAlertMessage("You Have Successfully Registered an Organisation"); }, 2000); 
  //  alert(data.success+"a campus ambassador");
  //  history.push('/dashboard');
  })
  .catch(err=>{
      console.log(err);
      setTimeout(function(){ AlertToggle(true); SetAlertMessage("An Error Occured, Try Again Or Check Your Network Connection"); }, 3000); 

  })}
}

 return (
<div>
<Alert name="alert" theme="success" style={{display:alertToggle?'block':'none'}} >
            {alertMessage}
        </Alert>
<Container>
  <Card small className="my-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                {/* First Name */}
                <Col md="4" className="form-group">
                  <label htmlFor="feFirstName">First Name</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="Full Name"
                    onChange = {handleChange} 
                    name = 'name' 
                    value = {data.name}
                  />
                </Col>
                {/* Last Name */}
                <Col md="4" className="form-group">
                  <label htmlFor="feLastName">Whatsapp Number</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Last Name"
                    onChange = {handleChange} 
                    name = 'number' 
                    value = {data.number}
                  />
                </Col>
                <Col md="4" className="form-group">
                <label htmlFor="feLastName">Date Of Birth</label>
                  <FormInput type="date" id="birthday" 
                   onChange = {handleChange} 
                    name = 'dob' 
                    value = {data.dob} />
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                <Col md="4" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    placeholder="Email Address"
                    // value="sierra@example.com"
                    onChange = {handleChange} 
                    name = 'email' 
                    value = {data.email}
                  />
                </Col>
                {/* Password */}
                <Col md="4" className="form-group">
                  <label htmlFor="fePassword">Password</label>
                  <FormInput
                    type="password"
                    id="fePassword"
                    placeholder="Password"
                    onChange = {handleChange} 
                    name = 'password' 
                    value = {data.password}
                    autoComplete="current-password"
                  />
                </Col>
                <Col md="4" className="form-group">
                  <label htmlFor="fePassword">Website URL</label>
                  <FormInput
                    type="text"
                    id="website"
                    placeholder="Website URL"
                    onChange = {handleChange} 
                    name = 'website' 
                    value = {data.website}
                  />
                </Col>
              </Row>
              <Row form>
              <Col md="6" className="form-group">
              <FormGroup>
                <label htmlFor="feAddress">Address</label>
                <FormInput
                  id="feAddress"
                  placeholder="Address"
                  onChange = {handleChange} 
                    name = 'residence' 
                    value = {data.residence}
                />
              </FormGroup>
              </Col>
               {/* country */}
               <Col md="6" className="form-group">
                  <label htmlFor="feInputState">Country</label>
                  <FormSelect id="feInputState" 
                   onChange={(e)=>setSelectedCountry(e.target.value)}
                   >
                    <option>Choose...</option>
                    {countries.map((data,index)=>{
                 return(
                    <option eventKey="1" key={index} value={data.country}>{data.country}</option>
                       );
                     })}
                  </FormSelect>
                </Col>
              </Row>
              <Row form>
                {/* City */}
                <Col md="6" className="form-group">
                  <label htmlFor="feCity">City</label>
                  <FormInput
                    id="feCity"
                    placeholder="City"
                    onChange = {handleChange} 
                    name = 'city' 
                    value = {data.city}
                  />
                </Col>
                {/* State */}
                <Col md="4" className="form-group">
                  <label htmlFor="feInputState">State</label>
                  <FormSelect id="feInputState" onChange={(e)=>setstate(e.target.value)}>
                    <option>Choose...</option>
                    {/* <option eventKey="1"  value="select a state"  >select a state</option> */}
                      {allstates.map((data,index)=>{
                         return(
                            <option eventKey={index} key={index}  value={data}  >{data}</option>
                               );
                       })}
                  </FormSelect>
                </Col>
                {/* TYpe Of Org Code */}
                <Col md="2" className="form-group">
                <label htmlFor="feInputState">Type</label>
                  <FormSelect id="feInputState" onChange={(e)=>setType(e.target.value)}>
                    <option>Choose...</option>
                    {role.map(data=>{
                      return(
                        <option eventKey="1"  value={data}  >{data}</option>
                    );})} 
                  </FormSelect>
                </Col>
              </Row>
              <Row form>
                {/* Fb */}
                <Col md="4" className="form-group">
                  <label htmlFor="feFirstName">Facebook Link</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="Facbook link"
                    onChange = {handleChange} 
                    name = 'facebook' 
                    value = {data.facebook}
                  />
                </Col>
                {/* linkedin */}
                <Col md="4" className="form-group">
                  <label htmlFor="feLastName">linkedin</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Linkedin (optional)"
                    onChange = {handleChange} 
                    name = 'linkedin' 
                    value = {data.linkedin}
                  />
                </Col>
                 {/* insta */}
                 <Col md="4" className="form-group">
                  <label htmlFor="feLastName">Instagram</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Instagram (optional)"
                    onChange = {handleChange} 
                    name = 'instagram' 
                    value = {data.instagram}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Description */}
                <Col md="12" className="form-group">
                  <label htmlFor="feDescription">Description<small>({data.description.length}/350 words)</small></label>
                  <FormTextarea id="feDescription" rows="5" cols="6"  onChange = {handleChange} 
                     maxlength = "350"
                     placeholder="Express Yourself In Not More Than 350 words"
   
                    name = 'description' 
                    value = {data.description}/>
                </Col>
              </Row>
              <Row form>
                {/* SCope */}
                <Col md="12" className="form-group">
                  <label htmlFor="feDescription">Scope<small>({data.scope.length}/350 words)</small></label>
                  <FormTextarea id="feDescription" rows="5" cols="6"  onChange = {handleChange} 
                     maxlength = "350"
                     placeholder="Express Yourself In Not More Than 350 words"
                    
                    name = 'scope' 
                    value = {data.scope}/>
                </Col>
              </Row>
                <Button theme="accent" value="Submit" onClick={onsubmit} >Submit</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
</Container>
</div>
);
}
OrganisationForm.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

OrganisationForm.defaultProps = {
  title: "Add Organisation details"
};

export default OrganisationForm;
