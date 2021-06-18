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

function AddTask({ title }) {
  const [user,setuser]=useState(JSON.parse(localStorage.getItem('user')).role);
  const [role,setrole]=useState(["country-ambassador","campus-ambassador","voulenteer"])
  const [assigned,setassiged]=useState("");
  const [alertToggle,AlertToggle]=useState(false);
   const [alertMessage,SetAlertMessage]=useState("");
   const [submit,setsubmit]=useState('submit') 
  const [data, SetData] = useState({
    points:"",
    description:"",
    title:"",
    media:""
})
const handleChange = e =>{
    const name = e.target.name;
    const value = e.target.value;
    SetData(prev => ({
        ...prev, [name]: value
    }));
}
function onsubmit(e)
{ AlertToggle(false);
  setsubmit('loading...')
    e.preventDefault();
    // console.log(data.dob + data.name + data.email + data.password + data.description + data.residence + data.pin + data.number);
 if(!user){
   return ;
 }else{
    fetch(`/tasks/${user}-add-task`,{
      method:"post",
      headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer "+localStorage.getItem("token")
      },
      body:JSON.stringify({
           title:data.title,
          description:data.description,
          points:data.points,
          assigned:assigned,
          taskmedia:data.media
      })
  })
  .then(res=>res.json())
  .then(data=>{
   console.log(data);
   setsubmit('submit');
   setTimeout(function(){ AlertToggle(true); SetAlertMessage("task posted Successfully"); }, 2000); 
  })
  .catch(err=>{
      console.log(err);
      setTimeout(function(){ AlertToggle(true); SetAlertMessage("An Error Occured, Try Again Or Check Your Network Connection"); }, 3000); 

  })}
}
console.log(assigned);
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
                {/* title */}
                <Col md="4" className="form-group">
                <label htmlFor="feCity">Assign Task To</label>
                  <FormSelect id="feInputState" 
                   onChange={(e)=>setassiged(e.target.value)}
                   >
                    <option>Choose...</option>
                    {role.map((data,index)=>{
                 return(
                      <option eventKey="1" key={index} value={data}>{data}</option>
                       );
                     })}
                  </FormSelect>
                </Col>
                <Col md="4" className="form-group">
                  <label htmlFor="feFirstName">First Name</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="Title"
                    onChange = {handleChange} 
                    name = 'title' 
                    value = {data.title}
                  />
                </Col>
                {/* points */}
                <Col md="4" className="form-group">
                  <label htmlFor="feLastName">Set points</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Points"
                    onChange = {handleChange} 
                    name = 'points' 
                    value = {data.points}
                  />
                </Col>
            </Row>
            <Row Form>
            
                {/* points */}
                <Col md="12" className="form-group">
                  <label htmlFor="feLastName">Set points</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Enter Drive Link"
                    onChange = {handleChange} 
                    name = 'media' 
                    value = {data.media}
                  />
                </Col>
            </Row>
              <Row form>
                {/* Description */}
                <Col md="12" className="form-group">
                  <label htmlFor="feDescription">Description <small> ({data.description.length}/500 words)</small></label>
                  <FormTextarea 
                  maxlength = "500"
                  placeholder="Express Yourself In Not More Than 500 words"
                  id="feDescription" rows="10" cols="6"  onChange = {handleChange} 
                    name = 'description' 
                    value = {data.description}/>
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
AddTask.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

AddTask.defaultProps = {
  title: "Add Task details"
};

export default AddTask;
