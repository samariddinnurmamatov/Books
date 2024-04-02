import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [secret, setSecret] = useState("");
  const [key, setKey] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/myself", {
        data: { secret },
        headers: { key },
      });
      if (response.data.isOk) {
        localStorage.setItem("key", response.data.data.key);
        localStorage.setItem("secret", response.data.data.secret);
        localStorage.setItem("USER", JSON.stringify(response.data.data));
        navigate("/main")
      }
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  
  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="secret">Secret</label>
          <input
            id="secret"
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter your secret"
            required
          />
        </div>
        <div>
          <label htmlFor="key">Key</label>
          <input
            id="key"
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter your key"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        Already signed up?  <Link to="/">Go to sign up.</Link>
      </div>
    </div>
  );
};

export default SignInForm



// import { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "../../../services/AuthService";
// import { useNavigate } from "react-router-dom";
// import { CircularProgress, TextField, Button } from "@material-ui/core";
// import Circle from '../../../assets/x-circle.png'

// const useForm = (initialState) => {
//   const [formData, setFormData] = useState(initialState);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return {
//     formData,
//     setFormData,
//     handleChange,
//   };
// };

// const SignInForm = () => {
//   const { formData, setFormData, handleChange } = useForm({
//     key: "",
//     secret: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const buttonText = loading ? <CircularProgress size={24} /> : "Submit";
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/myself", formData);
//       if (response.data.isOk) {
//         localStorage.setItem("key", response.data.data.key);
//         localStorage.setItem("secret", response.data.data.secret);
//         localStorage.setItem("USER", JSON.stringify(response.data.data));
//         navigate("/main");
//       }
//     } catch (error) {
//       console.log(error);
//       // Handle error
//     }
//   };

//   const isFormValid = () => {
//     return Object.values(formData).every(value => value !== '');
//   };

//   const renderTextField = (fieldName) => (
//     <div key={fieldName}>
//       {fieldName === "key" || fieldName === "secret" ? (
//         <TextField
//           type={fieldName === "email" ? "email" : "password"}
//           label={
//             fieldName === "key"
//               ? "Key"
//               : "Secret"
//           }
//           variant="outlined"
//           name={fieldName}
//           value={formData[fieldName]}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           error={!!errors[fieldName]}
//           helperText={errors[fieldName]}
//           InputProps={{
//             endAdornment: !!errors[fieldName] && (
//               <img
//                 src={Circle}
//                 alt="error"
//                 style={{ width: "22px", height: "20px" }}
//               />
//             ),
//           }}
//         />
//       ) : null}
//     </div>
//   );
  
  

//   return (
//     <form onSubmit={handleSubmit}>
//       {Object.keys(formData).map((fieldName) => renderTextField(fieldName))}
//       <Button
//         type="submit"
//         fullWidth
//         disabled={loading || !isFormValid()}
//         variant="contained"
//         style={{
//           backgroundColor: loading || !isFormValid() ? "gray" : "#6200EE",
//           color: "white",
//           marginTop: "20px",
//           padding: "9px 0"
//         }}
//       >
//         {buttonText}
//       </Button>
//       <div className="text-center text-[14px] py-[10px]">
//         <span>Dont have an account? </span>
//         <Link to={"/"} className="text-blue-500">
//           Sign Up
//         </Link>
//       </div>
//     </form>
//   );
// };

// export default SignInForm;