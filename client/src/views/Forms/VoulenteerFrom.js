import React,{useEffect,useState} from "react";
import PropTypes from "prop-types";
import CountryData from '../../utils/CountryStateList'
import CityData from '../../utils/city'
import CollegeData from '../../utils/College'
import Scroll from 'react-scroll'
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

function CampusForm({ title }) {
   const [user,setuser]=useState(JSON.parse(localStorage.getItem('user')));
   const [state,setstate]=useState('');
   const [alertToggle,AlertToggle]=useState(false);
   const [alertMessage,SetAlertMessage]=useState("");
   const [submit,setsubmit]=useState('submit')
   const [residenceFilter,setresidenceFilter]=useState(["Hostel","Mess","Housing Complex","Apartment"])
   const [residence,setresidence]=useState("")
   const [countries,setallcountries]=useState([{}])
   const [selectCountry,setSelectedCountry]=useState("India");
   const [allstates,setallstates]=useState([])
  const [allcities,setallcities]=useState([]);
  const [city,setcity]=useState("");
  const [college,setcollege]=useState("");
  const [endpoint,setendpoint]=useState("");
  //  const history = useHistory();
   const [data, SetData] = useState({
    name:"",
    email:"",
    password:"",
    pin:"",
    dob:"",
    number:"",
    description:"",
    facebook:"",
    linkedin:"",
    instagram:""
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
  {   if(user.role==="admin")
    {
        setendpoint("/admin-register-voulenteer");
    }else 
    if(user.role==="organisation"){
      setendpoint("/org-register-voulenteer");
    }else
    {
      setendpoint("/country-register-voulenteer");
    }}
   setallcountries(CountryData.countries); 
   setallstates(CountryData.countries[81].states);
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
useEffect(()=>{
  var FOUND = CityData.filter((post, index)=>{
   return (post.state === state)
}
);
if(FOUND)
{
 setallcities(FOUND);
console.log(FOUND)
}
},[state])
console.log(selectCountry);
function onsubmit(e)
{ 
  Scroll.animateScroll.scrollToTop() 
  // scroll.scrollToTop();
  AlertToggle(false);
  setsubmit('loading...')
    e.preventDefault();
    console.log(data.description);
 if(!user){
   return ;
 }else{
    fetch(`${BaseUrl.userApi}/${endpoint}`,{
      method:"post",
      headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer "+localStorage.getItem("token")
      },
      body:JSON.stringify({
          password:data.password,
          email:data.email,
          name:data.name,
          dob:data.dob,
          number:data.number,
          state,
          country:selectCountry,
          pin:data.pin,
          residence:residence,
          city:city,
          facebook:data.facebook,
          linkedin:data.linkedin,
          instagram:data.instagram,
          college:college,
          description:data.description
      })
  })
  .then(res=>res.json())
  .then(data=>{
   console.log(data);
   setsubmit('submit');
if(data.err)
{
  setTimeout(function(){ AlertToggle(true); SetAlertMessage("An Error Occured,"+data.err); }, 2000); 

}else
{
  setTimeout(function(){ AlertToggle(true); SetAlertMessage("You Have Successfully Registered a Campus Ambassador "); }, 2000); 

}
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
<Alert theme="info" style={{display:alertToggle?'block':'none'}} >
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
                    placeholder="Contact Number"
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
                <Col md="6" className="form-group">
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
                <Col md="6" className="form-group">
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
              </Row>
              <Row form>
              <Col md="4" className="form-group">
              <label htmlFor="feInputState">Residence</label>
              <FormGroup>
                <FormSelect id="feInputState" 
                   onChange={(e)=>setresidence(e.target.value)}
                   >
                    <option>Choose...</option>
                    {residenceFilter.map((data,index)=>{
                 return(
                     <option eventKey="1" key={index} value={data.country}>{data}</option>
                       );
                     })}
                  </FormSelect>
              </FormGroup>
              </Col>
               {/* College */}
               <Col md="4" className="form-group">
                  <label htmlFor="feInputState">College</label>
                  <FormSelect id="feInputState" 
                   onChange={(e)=>setcollege(e.target.value)}
                   >
                    <option>Choose...</option>
                    <option>others</option>
                    {CollegeData.Sheet1
                    .sort((a, b)=>
                    { var x = a.Name.toLowerCase();
                      var y = b.Name.toLowerCase();
                      if (x < y) {return -1;}
                      if (x > y) {return 1;}
                      return 0;
                    })
                    .map((data,index)=>{
                 return(
                   
                     <option eventKey="1" key={index} value={data.Name}>{data.Name}</option>
                   
                    // <option eventKey="1" key={index} value={data.country}>{data.country}</option>
                       );
                     })}
                  </FormSelect>
                </Col>
               {/* country */}
               <Col md="4" className="form-group">
                  <label htmlFor="feInputState">Country</label>
                  <FormSelect id="feInputState" 
                   onChange={(e)=>setSelectedCountry(e.target.value)}
                   >
                    <option>Choose...</option>
                    {countries.map((data,index)=>{
                 return(
                   
                     data.country==='India'?
                     <option eventKey="1" key={index} selected value={data.country}>{data.country}</option>:
                     <option eventKey="1" key={index} value={data.country}>{data.country}</option>
                   
                    // <option eventKey="1" key={index} value={data.country}>{data.country}</option>
                       );
                     })}
                  </FormSelect>
                </Col>
              </Row>
              <Row form>
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
                 {/* City */}
                 <Col md="4" className="form-group">
                  <label htmlFor="feCity">City</label>
                  <FormSelect id="feInputState" 
                   onChange={(e)=>setcity(e.target.value)}
                   >
                    <option>Choose...</option>
                    {allcities.map((data,index)=>{
                 return(
                      <option eventKey="1" key={index} value={data.country}>{data.city}</option>
                       );
                     })}
                  </FormSelect>
                </Col>
                {/* Zip Code */}
                <Col md="4" className="form-group">
                  <label htmlFor="feZipCode">Zip</label>
                  <FormInput
                    id="feZipCode"
                    placeholder="Zip"
                    onChange = {handleChange} 
                    name = 'pin' 
                    value = {data.pin}
                  />
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
              <Button theme="accent" value={submit} onClick={onsubmit}>Submit</Button>
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
CampusForm.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

CampusForm.defaultProps = {
  title: "Add Voulenteer details"
};

export default CampusForm;
