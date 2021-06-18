import React from 'react'
import { Container, Row, Col, Card, CardFooter,Button, CardBody, FormInput } from "shards-react";
import {Link} from "react-router-dom"
import Image from '../../../images/content-management/9.jpeg'
import '../../../assets/blog.css'
function MyBlogs({Posts , data}) {
  const onEnroll=(_id)=>{
    console.log(_id);
    fetch(`/api/blog/enroll`,{
      method:"post",
      headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer "+localStorage.getItem("token")
      },
      body:JSON.stringify({
        postId:_id
      })
  })
  .then(res=>res.json())
  .then(data=>{
   console.log(data);
  })
  .catch(err=>{
      console.log(err);
  })
  }  
  return (
        <Container className="my-3">
         <h5>{data.header}</h5>
            <Row>
          {Posts.length===0?
          <div style={{width:'100%',height:'100vh',top:'50%',left:'50%',transform:"translate(50%,50%)"}}>
            <div className="spinner-border" role="status"></div>
          </div>:
          Posts.map((post, idx) => (
            <Col lg="4" key={idx}>
              <Card small style={{maxHeight:"400px",height:'400px'}} className="card-post py-3 mb-4">
                <CardBody className="cardbody" style={{height:'300px',overflowY:'scroll'}}>
                  <h5 className="card-title">{post.title?post.title:data.title}</h5>
                  <div style={{}}>
                  <p className="card-text text-muted my-4">{post.description?post.description:data.description}
                 
                  <Link to={`/blog/post/${post._id}`}>
                    {/* <Button className="d-flex justify-content-end" size="sm" theme="white"> */}
                      <i className="far fa-bookmark mx-1 text-underline" /> visit here
                    {/* </Button> */}
                    </Link> </p></div>
                </CardBody>
                <CardFooter className="border-top d-flex">
                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{ backgroundImage: `url('${Image}')` }}
                    >
                      Written by James Khan
                    </a>
                    <div className="d-flex flex-column justify-content-center ml-3">
                      <span className="card-post__author-name">
                        {post.author}
                      </span>
                      <small className="text-muted">{post.updatedAt}</small>
                    </div>
                  </div>
                  <div className="my-auto ml-auto">
                    <Button
                    onClick={()=>onEnroll(post._id)} 
                    className={data.header==='My Actions'?'d-block':'d-none'} size="sm" theme="info">
                      <i className="fas fa-plus mr-1" /> Enroll
                  </Button></div>
                  <div className="my-auto ml-auto">
                  </div>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
        </Container>
    )
}
MyBlogs.defaultProps = {
    data:{
    title:'Default Title',
    url:'/add-new-post',
    description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
    }
  };
export default MyBlogs
