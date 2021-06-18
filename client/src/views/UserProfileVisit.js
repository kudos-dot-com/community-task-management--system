import React,{useState,useEffect} from "react";
import { Container, Row, Col } from "shards-react";
import {useParams} from "react-router-dom"
import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
import CaOverview from './CampusVolOverview'
import AdminOverView from './BlogOverview'
function UserProfileLite() {
  const {role,id}=useParams();
  const [user,setuser]=useState({})
  useEffect(()=>{
    // setuser(JSON.parse(localStorage.getItem('user')));
    fetch(`/user/${role}/profile`,{    
      method:"post",
      headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer "+localStorage.getItem("token")
      },
      body:JSON.stringify({
      id: id
      })
  })
  .then(response => response.json())
  .then(data =>{
      console.log(data);
      setuser(data.success);
  })
  .catch(err=>{
      console.log(err);
  })
    console.log(user);
  },[])
  return (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
      <Col lg="12">
        <UserDetails user={user} visit={"true"}/>
      </Col>
      {
        (role==="campus-ambassador" || user.role==="voulenteer")? 
        <CaOverview role={role} />:<AdminOverView/>
          
      }
      {/* <CaOverView /> */}
      <Col lg="12">
        {/* <UserAccountDetails user={user} visit={"true"}/> */}
      </Col>
    </Row>
   
    {/* <UserAccountDetails /> */}
  </Container>
)}
export default UserProfileLite;
