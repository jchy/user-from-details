import { useEffect, useRef, useState } from "react";
import axios  from "axios";

export default function Form() {
  const [formState, setFormState] = useState({
    name: "",
    age: 0,
    address: "",
    gender: "",
    department: "",
    salary: 0,
    maritalStatus: false,
    image: null
  });


  const getUsers = async () => {
      console.log("getUsers");
    const config = {
      url: `http://localhost:3000/usersData`,
      method: "get"
    };
    return axios(config);
  };

  const getUsersData = ()=>{
      getUsers()
      .then((res)=>{
          console.log(res.data);
      })
  }

  const postUserDataIntoDataBase = (payload) =>{
      console.log("payload is : ",payload);
    const config = {
        url: "http://localhost:3000/usersData",
        method: "post",
        data: payload
      };
      return axios(config);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    postUserDataIntoDataBase(formState);
  };


  const [imageSrc, setImageSrc] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const file = imageRef.current.files[0];
    let src = null;
    if (file) {
      src = URL.createObjectURL(file);
      formState.image = src;
    }
    setImageSrc(src);
    return () => {
      URL.revokeObjectURL(src);
    };
  }, [formState.image]);

  const handleImageChange = (e) => {
    try {
      const file = e.target.files[0];
      setFormState({
        ...formState,
        image: file
      });
    } catch (err) {}
    // base-64
  };

  const handleFormUpdate = (e) => {
    let { name, value, type, checked } = e.target;
    // compute final value, is it value / checked
    console.log("value of checked",checked )
    const val = type === "checkbox" ? checked : value;
    setFormState({
      ...formState,
      [name]: val
    });
  };
  // console.log(imageRef);

  return (
    <>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection:"column", textAlign: 'left', width:"400px", margin:"auto",gap:"0.5rem", border: '1px solid white',padding: '1rem', borderRadius: '10px'}}>
        <div style={{flexDirection:"row", display: 'flex'}}>
            <div style={{width:"100px"}}>
                 <label>Name : </label>
            </div>
            <div style={{width:"200px"}}>
            <input
                onChange={handleFormUpdate}
                value={formState.name}
                placeholder="Name"
                type="text"
                name="name"
            />
            </div>
        </div>

        <div style={{flexDirection:"row", display: 'flex'}}>
            <div style={{width:"100px"}}>
                 <label>Age : </label>
            </div>
            <div style={{width:"200px"}}>
            <input
            onChange={handleFormUpdate}
            value={formState.age}
            placeholder="Age"
            type="number"
            name="age"
          />
            </div>
        </div>

        <div style={{flexDirection:"row", display: 'flex'}}>
            <div style={{width:"100px"}}>
                 <label>Address : </label>
            </div>
            <div style={{width:"200px"}}>
            <input
            onChange={handleFormUpdate}
            value={formState.address}
            placeholder="Address"
            type="text"
            name="address"
          />
            </div>
        </div>

        <div style={{flexDirection:"row", display: 'flex'}}>
            <div style={{width:"100px"}}>
                 <label>Gender : </label>
            </div>
            <div style={{width:"200px"}}>
            <select
            value={formState.gender}
            onChange={handleFormUpdate}
            name="gender"
          >
            <option value="" key="1">
              Select a Gender
            </option>
            <option value="M" key="male">
              M
            </option>
            <option value="F" key="female">
              F
            </option>
          </select>
            </div>
        </div>


        <div style={{flexDirection:"row", display: 'flex'}}>
            <div style={{width:"100px"}}>
                 <label>Department : </label>
            </div>
            <div style={{width:"200px"}}>
            <select
            value={formState.department}
            onChange={handleFormUpdate}
            name="department"
          >
            <option value="" key="1">
              Select Your Department
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
        
        <div style={{flexDirection:"row", display: 'flex'}}>
            <div style={{width:"100px"}}>
                 <label>Salary : </label>
            </div>
            <div style={{width:"200px"}}>
            <input
            onChange={handleFormUpdate}
            value={formState.salary}
            placeholder="salary"
            type="number"
            name="salary"
          />
            </div>
        </div>

        <div style={{flexDirection:"row", display: 'flex'}}>
            <div style={{width:"100px"}}>
                 <label>Marital status</label>
            </div>
            <div style={{width:"200px"}}>
            <input
            checked={formState.maritalStatus}
            onChange={handleFormUpdate}
            name="maritalStatus"
            type="checkbox"
          />
            </div>
        </div>

        <div style={{flexDirection:"row", display: 'flex'}}>
            <div style={{width:"100px"}}>
                 <label>Profile Pic</label>
            </div>
            <div style={{width:"200px"}}>
                <input
                multiple
                onChange={handleImageChange}
                ref={imageRef}
                type="file"
            />
             {imageSrc && <img src={imageSrc} alt="profile" />}
            </div>
        </div>
        <div style={{textAlign:"center",margin:"20px"}}>
            <button type="submit" onClick={handleSubmit}>
            SUBMIT
            </button>
      </div>
      </form>
    </>
  );
}