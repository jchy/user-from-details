import React from "react";
import {useState, useEffect} from "react";
import axios  from "axios";

const Table = () =>{
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortedData, setSortedData] = useState({order:null});
    const [filterby, setFilterBy] = useState("select");
    // const [filterFlag, setFilterFlag] = useState("");

    const getUserData = async () => {
      const config = {
        url: `http://localhost:3000/usersData`,
        method: "get"
      };
      return axios(config);
    };
  
    useEffect(() => {
        getUserData()
             .then((res)=>{
                 setUserData(res.data);
             })
             setLoading(false);
        //  console.log(userData);
    },[])

    const handleAscendingSalary = (flag)=>{
        setSortedData({order:flag});
    }

    const handleFilter =(e)=>{
        setFilterBy(e.target.value);
    }

    return (
        <>
        <div style={{display: 'flex', flexDirection: 'column',textAlign: 'left', width:"400px",margin:"auto", gap:"1rem",marginTop:"20px"}}>
            <div>
                ◎ <label htmlFor="salary">Sort By Salary : </label>
            {
                ["Ascending", "Descending"].map(order=>{
                    return <button onClick={()=>handleAscendingSalary(order)} key={order}>{order} order of Salary </button>
                })
            }
            </div>
            <div>
            ◎ <label htmlFor="salary">Filter by Department : </label>
                <select
            onChange={handleFilter}
            name="department"
          >
            <option value="select" key="1">
              Select The Department
            </option>
            <option value="Construction" key="Contruction">
              Construction
            </option>
            <option value="Houekeeping" key="Houekeeping">
              Houekeeping
            </option>
            <option value="IT" key="IT">
              IT Services
            </option>
            <option value="Management" key="Management">
              Management
            </option>
            <option value="Director" key="Director">
              Director
            </option>
            <option value="Stakeholder" key="Stakeholder">
              Stakeholder
            </option>
          </select>
            </div>
        </div>
            <div style={{display:"flex", justifyContent: "center", marginTop:"20px"}}>
                {loading ? (<h3>...Loading</h3>) : (
                    <table border="1" cellSpacing="0" cellPadding="10" style={{border: "1px solid white", backgroundColor:"#801488"}}>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Age
                            </th>
                            <th>
                                Address
                            </th>
                            <th>
                                Gender
                            </th>
                            <th>
                                Department
                            </th>
                            <th>
                                Salary
                            </th>
                            
                            <th>
                                Marital Status
                            </th>
                        </tr>
                        {
                            userData.sort((a,b)=>{
                                if(sortedData.order ==="Unsorted"){
                                    return 0;
                                }
                                if(sortedData.order === "Ascending"){
                                   return a.salary-b.salary;
                                }
                                if(sortedData.order === "Descending"){
                                    return b.salary-a.salary;
                                }
                            }).filter((item)=>{
                                if(filterby === "select" ){
                                    return item;
                                }
                                return (item.department === filterby);
                            }).map((item)=>{
                                return (
                                    <>
                                    <tr>
                                        <td>
                                          {item.name}
                                        </td>
                                        <td>
                                          {item.age}
                                        </td>
                                        <td>
                                          {item.address}
                                        </td>
                                        <td>
                                          {item.gender}
                                        </td>
                                        <td>
                                          {item.department}
                                        </td>
                                        <td>
                                          {item.salary}
                                        </td>
                                        <td>
                                          {item.maritalStatus ? "Married" : "Unmarried"}
                                        </td>
                                        {/* <td>
                                            {item.image}
                                        </td> */}
                                    </tr>
                                </>
                                )
                            })
                        }
                    </table>
                )}
            </div>
        </>
    );
}
export default Table;