import React,{useEffect,useState} from 'react'
import DescriptionCards from '../../components/DescriptionCard/DescriptionCard'
import Tables from '../Tables'
import CountryData from '../../utils/CountryStateList'
import BaseUrl from "../../Api/Api"
function AddCampusAmbassador({data}) {
    const [user,setuser]=useState([]);
    const [status,setstatus]=useState(["ACTIVE","DEACTIVATED"]);
    const [role,setrole]=useState(["campus-ambassador","voulenteer","country-ambassador","organisation","admin"]);
    const [tableitem,settableitem]=useState(["number","email","city","state","status","country","residence"].sort());
    const [campusrole,getrole]=useState("");
    const [city,setcity]=useState("");
    const [state,setstate]=useState("");
    const [country,setcountry]=useState("");
    const [countries,setallcountries]=useState([{}])
    const [selectCountry,setSelectedCountry]=useState("");
    const [allstates,setallstates]=useState([])
    const [usertoken,setuserfromtoken]=useState({});
    const [endpoint,setendpoint]=useState("");
    const [filter,flterItems]=useState([...tableitem]);
    useEffect(()=>{
        // setuserfromtoken(JSON.parse(localStorage.getItem('user')));
        console.log(BaseUrl.userApi);
        fetch(`/api/users/get-campus-user`,{    
        headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            setuser(data.success);
        })
        .catch(err=>{
            console.log(err);
        })
        setallcountries(CountryData.countries); 
        console.log();
},[endpoint])
    
    return (
        <div>
            <DescriptionCards data={data}/>
            <Tables  type="user" title="Campus Ambassadors" users={user} filter={filter}/>
        </div>
    )
}
AddCampusAmbassador.defaultProps = {
    data:{
    title:'add campus ambassador',
    url:'/form/add-campus-ambassador',
    description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
    }
  };
export default AddCampusAmbassador
