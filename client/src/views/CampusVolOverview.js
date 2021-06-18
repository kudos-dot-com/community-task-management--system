import React,{useState,useEffect} from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card,CardBody,CardHeader } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./../components/blog/UsersOverview";
import UsersByDevice from "./../components/blog/UsersByDevice";
import NewDraft from "./../components/blog/NewDraft";
import Discussions from "./../components/blog/Discussions";
import TopReferrals from "./../components/common/TopReferrals";
function BlogOverview({ role }){
  const [user,setuser]=useState(JSON.parse(localStorage.getItem('user')))
  let [stats,setstats]=useState({campus:"",blogs:""})
 let [smallStats,setSmall]=useState([
    {
        label: "Tasks Enrolled",
        value: "???",
        icon:"fas fa-tasks"
        
    },
    {
      label: "Tasks Approved",
      value: "???",
      icon:"fas fa-tasks"
      
     },
     {
      label: "Tasks Approval Pending",
      value: "17,281",
      icon:"fas fa-tasks"
     },
     {
      label: "Action Enrolled",
      value: "17,281",
      icon:"fas fa-tasks"
     },
     {
      label: "Actions Submitted",
      value: "17,281",
      icon:"fas fa-tasks"
     },
     {
      label: "Total Points",
      value: "17,281",
      icon:"far fa-user"
     },
     
    ])
//   stars here
  useEffect(()=>{
    // setuser(JSON.parse(localStorage.getItem('user')));
    const addedBy=user.addedByOrg?"organisation":user.addedByCountry?"country":"admin";
    fetch(`/api/stats//${role}-getTotalTasksApproved-${addedBy}`,{
      headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer "+localStorage.getItem("token")
      }
  })
  .then(res=>res.json())
  .then(data=>{
   console.log(data);
   smallStats[1].value=`${data.success}`;
   setSmall([...smallStats])
  })
  .catch(err=>{
      console.log(err);
  })

  fetch(`/api/stats//${role}-getTotalTasksEnrolled-${addedBy}`,{
    headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer "+localStorage.getItem("token")
    }
})
.then(res=>res.json())
.then(data=>{
 console.log(data);
 smallStats[0].value=`${data.success}`;
 setSmall([...smallStats])
})
.catch(err=>{
    console.log(err);
})

fetch(`/api/stats//${role}-getTotalTasksNotApproved-${addedBy}`,{
    headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer "+localStorage.getItem("token")
    }
})
.then(res=>res.json())
.then(data=>{
 console.log(data);
 smallStats[2].value=`${data.success}`;
 setSmall([...smallStats])
})
.catch(err=>{
    console.log(err);
})
  

  },[])
  return (
  <Container  className="main-content-container px-4">
    
    <Row>
      {smallStats.map((stats, idx) => (
        <Col className="mb-4" md="3"  sm="12" key={idx} >
          {/* <Card style={{backgroundColor:"#c7ecee"}}>
          <CardHeader>{stats.label}</CardHeader>
          <CardBody>{stats.value}</CardBody>
          </Card> */}
          <SmallStats
            id={`small-stats-${idx}`}
            variation="1"
            icon={stats.icon}
            label={stats.label}
            value={stats.value}
           
          />
        </Col>
      ))}
    </Row>

    <Row>
    
    </Row>
  </Container>
);
}
BlogOverview.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

BlogOverview.defaultProps = {}

export default BlogOverview;
