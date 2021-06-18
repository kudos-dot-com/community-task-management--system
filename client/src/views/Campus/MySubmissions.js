import React,{useEffect,useState} from 'react'
import { Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import SubmissionTables from '../TableForSubmission'
import CountryData from '../../utils/CountryStateList'
import BaseUrl from "../../Api/Api"
function MySubmission({data , title}) {
    const [user,setuser]=useState([]);
    const [userdata,setuserdata]=useState(JSON.parse(localStorage.getItem('user')));
    const [role,setrole]=useState(["campus-ambassador","voulenteer","country-ambassador","organisation","admin"]);

    const [tableitem,settableitem]=useState(["title","description","points","updatedAt"]);
    const [filter,flterItems]=useState([...tableitem]);
  
    return (
        <div>           
            <SubmissionTables  type="campus" title="Submissions" subtitle="My Task" users={user} filter={filter}/>
        </div>
    )
}
MySubmission.defaultProps = {
    data:{
    title:'My Submissions',
    }
  };
export default MySubmission
