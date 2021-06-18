import React,{useEffect,useState} from 'react'
import { Container, Row, Col, Card,CardHeader, CardFooter,Button, CardBody, FormInput } from "shards-react";
import {useParams} from 'react-router-dom'
function MyBlogs({data}) {
    const [post, setPost] = useState([])
    const {postId}=useParams();
    console.log(postId)

    // const postId = props.match.params.postId;

    useEffect(() => {

        const variable = {  }
        fetch(`/api/blog/getPost`,{    
            method:"post",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify({
            postId: postId
            })
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            setPost(data.post);
        })
        .catch(err=>{
            console.log(err);
        })
        // axios.post('/api/blog/getPost', variable)
        //     .then(response => {
        //         if (response.data.success) {
        //             console.log(response.data.post)
        //             setPost(response.data.post)
        //         } else {
        //             alert('Couldnt get post')
        //         }
        //     })
    }, [])   
    return (
        <Container>
            <Card className="my-3">
                <CardHeader>
                    <h4><b>{post.title?post.title:"Loading..."}</b></h4>
                    <p className="card-text text-muted">{post.updatedAt?`Posted At: ${post.updatedAt}`:""}</p>
                </CardHeader>
                <CardBody dangerouslySetInnerHTML={{ __html: post.content }}>
                </CardBody>
            </Card>
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
