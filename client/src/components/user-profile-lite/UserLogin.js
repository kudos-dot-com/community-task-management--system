import React,{useState,useEffect} from "react";
import {useHistory} from 'react-router-dom'
import PropTypes from "prop-types";
import BaseUrl from "../../Api/Api"
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Alert,
  Button
} from "shards-react";

function UserLogin({ title }){

    let history = useHistory();
    const [alertToggle,AlertToggle]=useState(false);
    const [alertMessage,SetAlertMessage]=useState("");
    const [data, SetData] = useState({
        email:"",
        password:""
    })
    const handleChange = e =>{
        const name = e.target.name;
        const value = e.target.value;
        SetData(prev => ({
            ...prev, [name]: value
        }));
    }
    useEffect(()=>{
      localStorage.setItem('user',JSON.stringify({role:""}))
    },[])
    const SubmitLogin = e =>{
        // setButtonText('Loading...');
        AlertToggle(false);
        console.log(data);
        fetch(`/api/users/user-login`,{    
            method:"post",
            headers:{
                "Content-Type":"application/json"
                // Authorization:"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify({
               email:data.email,
               password:data.password
            })
        })
            .then(response => response.json())
            .then(res =>{
                console.log(res);
               if(res.err)
               {
                SetAlertMessage("Sorry! Either Password Or Email Is wrong");
                AlertToggle(true);   
                }
               else{
                localStorage.setItem('token',res.token);
                localStorage.setItem('user',JSON.stringify(res.user))
                history.push('/dashboard');
                // setTimeout(function(){   }, 3000);
               
                AlertToggle(false);
               }
            })
            .catch(err=>{
                SetAlertMessage("Check Your Network Connection !");
                AlertToggle(true);
            })
    }
    return (
        
 <Card small className="mb-4">
        <Alert theme="danger" style={{display:alertToggle?'block':'none'}}>
            Alert ! - Unexpected Error Has Occured - {alertMessage}
        </Alert>
    <CardHeader className="border-bottom">
      <h3 className="m-0">{title}</h3>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
               {/* Email */}
               <Col md="12" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    placeholder="Email Address"
                    onChange = {handleChange} 
                    name = 'email' 
                    value = {data.email}
                    autoComplete="email"
                  />
                </Col>
              </Row>
              <Row form>
                {/* Password */}
                <Col md="12" className="form-group">
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
              <Button onClick={()=>SubmitLogin()} theme="accent">Submit</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);
 }
UserLogin.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserLogin.defaultProps = {
  title: "Login"
};

export default UserLogin;
