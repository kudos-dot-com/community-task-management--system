import React,{useState,useEffect} from "react";
import { Container, Row, Col } from "shards-react";
import '../assets/blog.css'
import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
import AdminOverView from './BlogOverview'
import CaOverview from './CampusVolOverview'
function UserProfileLite() {
  const [user,setuser]=useState(JSON.parse(localStorage.getItem('user')))
  useEffect(()=>{
    // setuser(JSON.parse(localStorage.getItem('user')));
    console.log(user);
  },[])
  return (
    <Container fluid className="main-content-container px-4 dashboard" >
    <Row noGutters className="page-header py-4">
      <PageTitle title="Your Dashboard" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
      <Col lg="12">
        <UserDetails user={user}/>
      </Col>
      {
        (user.role==="campus-ambassador" || user.role==="voulenteer")? 
        <CaOverview role={user.role} />:<AdminOverView/>
          
      }
      
      <Col lg="12">
        {/* <UserAccountDetails user={user} /> */}
      </Col>
    </Row>
   
    {/* <UserAccountDetails /> */}
  </Container>
)}
export default UserProfileLite;
