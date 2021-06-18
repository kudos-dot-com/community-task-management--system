import axios from 'axios'
import React,{useState} from "react";
import PropTypes from "prop-types";
import {
  Container,
  Card,
  CardHeader,
  Button,
  Form,
  Fade,
  Modal,   ModalBody, ModalHeader,ModalFooter,
  FormInput,
  ListGroup,
  ListGroupItem,
  Progress,Row,Col
  ,Badge
} from "shards-react";
import Blog from '../../../src/views/BlogOverview'
function UserDetails({user,userDetails,visit }) {
  // const [user,setuser]=useState(JSON.parse(localStorage.getItem('user')));
  const [open,setopen]=useState(false);
  const [file,setfile]=useState("");
  const [pic,setpic]=useState("");
  // console.log(file);

  const fileUpload=()=>{
    let formData = new FormData();
            const config = {
                header: { 'content-type': 'multipart/form-data' }
              }
            formData.append("file", file);

            axios.post('/api/blog/uploadfiles', formData, config)
                .then(response => {
                    if (response.data.success) {
                      let data={
                        link:"/" + response.data.url,
                        id:user._id
                      }
                     setpic("/" + response.data.url);
                        console.log(response.data);
                        axios.put('/uploadphoto',data)
                        .then(response=>{
                          console.log(response.data);
                          localStorage.setItem('user',JSON.stringify(response.data.success))
                          
                        })            
                        .catch(err=>{
                          console.log(err);
                        })
                        
                    } else {
                        return alert('failed to upload file')
                    }
                })
                setopen(!open)
        }
  return (
  <Card small className="mb-4 pt-3" style={{minHeight:"150px"}}>
   
    <CardHeader className=" text-center py-3">
    <Row className="d-md-flex flex-wrap">
      <Col md="2" sm="12" className="">
        {/* {pic} */}
        {/* <img src={pic} /> */}
        {/* <div> */}
        {pic?
        <img src={pic} style={{height:"150px",width:"150px",border:"1px solid #fff",borderRadius:"50%",objectFit:"fill"}}/>:
        JSON.parse(localStorage.getItem('user')).pic!==''?
        <img src={JSON.parse(localStorage.getItem('user')).pic}
         style={{height:"150px",width:"150px",border:"1px solid #fff",borderRadius:"50%"}}/>:
        <i className="fas fa-user-circle " style={{fontSize:"150px",margin:"auto"}}></i>
          }
        {/* </div> */}
         <br/>
      <div className="mt-4">
   
     
     
      </div>
      {/* </Col> */}
      </Col> 
      {!user.name?"Getting Information ...":
      <Col md="10" sm="12">
      <strong>
      <h4 className=" d-md-flex d-sm-block flex-wrap justify-content-start mb-md-1 m-auto text-capitalize">
        {user.name}{" "}<Badge theme="success" style={{transform:"scale(0.7)",marginTop:"3px"}}>{user.status}</Badge>
        </h4>
      </strong>
      <div className=" d-flex flex-wrap justify-content-md-start justify-content-center text-muted text-capitalize">
        {/* <strong> */}
         <div className="d-flex">
         <i className="d-block pt-1 pr-1 fas fa-id-badge "></i>
          <p className=" d-block text-muted pr-2 ">
         {user.role}
         </p>
         </div>

         <div className="d-flex">
         <i className="d-block pt-1 pr-1 fas fa-envelope"></i>
          <p className=" d-block text-muted pr-2 ">
         {user.email}
         </p>
         </div>

         <div className="d-flex">
         <i className="d-block pt-1 pr-1 fas fa-calendar-alt"></i>
          <p className=" d-block text-muted px-2 ">
        Joined At {user.createdAt}
         </p>
         </div>
       </div>
      
        <strong className="d-flex justify-content-start text-baseline">
          <h6 className="text-left" style={{color:"#171717"}}>
            {userDetails.metaValue}
          </h6>
        </strong>
    </Col>
    }</Row>
    </CardHeader>
    {/* <Blog /> */}
    <Col>
    <Button onClick={()=>setopen(!open)} pill outline size="md" className="ml-md-4 my-md-2 mx-auto my-2" name="myfile" for="myfile" style={{display:visit==="true"?"none":"block"}}>
         +Add Photo
      </Button>
      {/* modal */}
      <Fade in={open}> 
        <Modal  open={open} >
          <ModalHeader>Upload Photo</ModalHeader>
          <ModalBody className="border-bottom">
          <Container>
          <Form Row >
              <label for="myfile">Select a file:</label>
               <FormInput 
               onChange={(e)=>setfile(e.target.files[0])}
               type="file" accept="image/*" id="myfile" name="myfile" /><br/><br/>
            </Form>
          </Container>
          </ModalBody>
          <ModalFooter>
          <span>
            <Button  onClick={()=>setopen(!open)} className="btn btn-info mr-1 ">Close</Button>
            <Button onClick={()=>fileUpload()} className="btn btn-info">Yes</Button>
          </span>
          </ModalFooter> 
          </Modal></Fade>
          </Col>
  </Card>
);
}
UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserDetails.defaultProps = {
  userDetails: {
    name: "Sierra Brooks",
    avatar: require("./../../images/avatars/0.jpg"),
    jobTitle: "Project Manager",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Description",
    metaValue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque? "
  
    }
};

export default UserDetails;
