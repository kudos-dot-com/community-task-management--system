import React,{useState,useEffect} from "react";
import { Container,Button, Row, Col, Card, CardHeader, CardBody, FormInput,FormSelect } from "shards-react";
import CountryData from '../../utils/CountryStateList'
import { Dispatcher, Constants } from "../../flux";

// import PageTitle from "../components/common/PageTitle";
function CampusFilter () {

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
        setallcountries(CountryData.countries); 
      },[])
    useEffect(()=>{
      var FOUND = countries.find(function(post, index) {
      if(post.country === selectCountry)
          return true;
     });
      if(FOUND)
      {
      setallstates(FOUND.states);
      // console.log(FOUND.states) 
      }
      },[selectCountry])  
  useEffect(()=>{
    console.log(selectCountry + state);  

    Dispatcher.dispatch({
      actionType: Constants.SAVE_FILTER,
      key:'country',
      value:selectCountry
    });
   
      Dispatcher.dispatch({
        actionType: Constants.SAVE_FILTER,
        key:'state',
        value:state
      });
  },[selectCountry,state])

  const resetFilter=()=>{
    setSelectedCountry("");
    setstate("");
  }
return (
  <Container fluid className="main-content-container ">
    <Row>
        <>
        <Card small className="mb-2 pt-4 pb-2">
            <CardBody className="p-0 pb-3">
              <Container>
                <Row>
                  <Col>
                <label htmlFor="#username">Status</label>
                <FormSelect id="feInputState" onChange={(e)=>setstatus(e.target.value)}>
                    <option>Choose...</option>
                      {status.map((data,index)=>{
                         return(
                            <option eventKey={index} key={index}  value={data}  >{data}</option>
                               );
                       })}
                  </FormSelect>
                </Col>

                <Col>
                <label htmlFor="#username">Country</label>
                <FormSelect id="feInputState"
                onChange={(e)=>setSelectedCountry(e.target.value)}
                   >
                    <option>Choose...</option>
                    {countries.map((data,index)=>{
                 return(
                   
                   
                     <option eventKey="1" key={index} value={data.country}>{data.country}</option>
                   
                    // <option eventKey="1" key={index} value={data.country}>{data.country}</option>
                       );
                     })}
                  </FormSelect>
                </Col>

                <Col>
                <label htmlFor="#username">State</label>
                <FormSelect id="feInputState" onChange={(e)=>setstate(e.target.value)}>
                    <option>Choose...</option>
                    {/* <option eventKey="1"  value="select a state"  >select a state</option> */}
                      {allstates.map((data,index)=>{
                         return(
                            <option eventKey={index} key={index}  value={data}  >{data}</option>
                               );
                       })}
                  </FormSelect>
                </Col>
              </Row>
              <br />
              <Row>
                
                  <Col></Col>
                  <Col className=" d-flex justify-content-center">
                    <Button theme="secondary" className="mr-2">Apply</Button>
                    <Button onClick={()=>resetFilter()} theme="dark" >Reset</Button>
                  </Col>

                  <Col className="d-flex justify-content-end">
                  <Button theme="accent" >Filter</Button>
                  </Col>
              </Row>
              </Container>
            </CardBody>
        </Card>
        </>
    </Row>
  </Container>
);
}
export default CampusFilter;
