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
function BlogOverview({ }){
  const [user,setuser]=useState(JSON.parse(localStorage.getItem('user')))
  let [stats,setstats]=useState({campus:"",blogs:""})
 let [smallStats,setSmall]=useState([
    {
      label: "Campus Ambassador",
      value: "???",
      icon:"far fa-user"
    },
    {
      label: "Country Ambasador",
      value: "???",
      icon:"far fa-user"
    
    },
    {
      label: "Organisations",
      value: "???",
      icon:"far fa-user"
     
    },
    
    {
      label: "Voulenteers",
      value: "???",
      icon:"far fa-user"
     
    },
    {
      label: "Tasks Posted",
      value: "???",
      icon:"fas fa-tasks"
      
     },
     {
      label: "Tasks Approved",
      value: "17,281",
      icon:"fas fa-tasks"
     },
     {
      label: "Needs Approval",
      value: "17,281",
      icon:"fas fa-tasks"
     },
     {
      label: "Points Alloted",
      value: "17,281",
      icon:"fas fa-tasks"
     },
     {
      label: "Actions Taken",
      value: "17,281",
      icon:"far fa-user"
     },
     {
      label: "Total Points",
      value: "17,281",
      icon:"far fa-user"
     },
     
    ])
  useEffect(()=>{
    setuser(JSON.parse(localStorage.getItem('user')));
    fetch(`/api/stats//getTotalBlogs`,{
      headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer "+localStorage.getItem("token")
      }
  })
  .then(res=>res.json())
  .then(data=>{
   console.log(data);
   smallStats[8].value=`${data.success}`;
   setSmall([...smallStats])
  })
  .catch(err=>{
      console.log(err);
  })
  },[])
  useEffect(()=>{
    // setuser(JSON.parse(localStorage.getItem('user')));
    fetch(`/api/stats//getTotalCampus`,{
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
  // country
  fetch(`/api/stats//getTotalCountry`,{
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
  
  },[])
  useEffect(()=>{
    setuser(JSON.parse(localStorage.getItem('user')));
    fetch(`/api/stats/getTotalOrganisation`,{
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
  fetch(`/api/stats/getTotalVolunteer`,{
    headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer "+localStorage.getItem("token")
    }
})
.then(res=>res.json())
.then(data=>{
 console.log(data);
 smallStats[3].value=`${data.success}`;
 setSmall([...smallStats])
})
.catch(err=>{
    console.log(err);
})
  },[])
  useEffect(()=>{
    // setuser(JSON.parse(localStorage.getItem('user')));
    fetch(`/api/stats//getTotalTasks`,{
      headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer "+localStorage.getItem("token")
      }
  })
  .then(res=>res.json())
  .then(data=>{
   console.log(data);
   smallStats[4].value=`${data.success}`;
   setSmall([...smallStats])
  })
  .catch(err=>{
      console.log(err);
  })
  fetch(`/api/stats//getTotalTasksApproved`,{
      headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer "+localStorage.getItem("token")
      }
  })
  .then(res=>res.json())
  .then(data=>{
   console.log(data);
   smallStats[5].value=`${data.success}`;
   setSmall([...smallStats])
  })
  .catch(err=>{
      console.log(err);
  })
  fetch(`/api/stats//getTotalTasksNotApproved`,{
    headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer "+localStorage.getItem("token")
    }
})
.then(res=>res.json())
.then(data=>{
 console.log(data);
 smallStats[6].value=`${data.success}`;
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
