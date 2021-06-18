import React,{useEffect,useState} from 'react'
import DescriptionCards from '../../../components/DescriptionCard/DescriptionCard'
import Tables from '../../TableForAction'
import CountryData from '../../../utils/CountryStateList'
import MyBlogs from '../Admin/MyBlogs'
function AddCampusAmbassador({data}) {
    const [user,setuser]=useState([]);
    useEffect(()=>{      
        fetch(`/api/blog/getBlogs`,{    
        headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            setuser(data.blogs);
        })
        .catch(err=>{
            console.log(err);
        })
       
        console.log();
},[])
    
    return (
        <div>
            {/* <DescriptionCards data={data}/> */}
            {/* <Tables title="Action Enrollment" users={user} /> */}
            <MyBlogs data={data} Posts={user}/>
        </div>
    )
}
AddCampusAmbassador.defaultProps = {
    data:{
    header:"My Actions",    
    title:'Take Action',
    url:'/add-new-post',
    description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
    }
  };
export default AddCampusAmbassador
