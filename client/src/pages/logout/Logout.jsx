// import axios from "axios";
// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";

// const Logout = () => {
//   const { user, dispatch } = useContext(AuthContext);
//   console.log(user);
//   const logout = async () => {
//     try {
//       await axios.get("/auth/logout");
//       dispatch({ type: "LOGOUT" });
//     } catch (error) {
//       dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
//     }
//   };
//   return (
//     <div>
//       <Link
//         to={"/"}
//         onClick={logout}
//         style={{ color: "inherit", textDecoration: "none" }}
//       >
//         go back
//       </Link>
//     </div>
//   );
// };

// export default Logout;
