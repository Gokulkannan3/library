import React from "react";
import {Routes,Route} from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Adminl from "./pages/Adminl";
import Asignup from "./pages/Asignup";
import Usignup from "./pages/Usignup";
import Userl from "./pages/Userl";
import Admin from "./pages/Admin";
import Adminpannel from "./pages/Adminpannel";
import Userpannel from "./pages/Userpannel";

const AllRoutes = () =>{
    return(
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/admin" element={<Admin/>}/>
            <Route exact path="/adminlogin" element={<Adminl/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/adminsignup" element={<Asignup/>}/>
            <Route exact path="/usersignup" element={<Usignup/>}/>
            <Route exact path="/userlogin" element={<Userl/>}/>
            <Route exact path="/adminpannel" element={<Adminpannel/>}/>
            <Route exact path="/userpannel" element={<Userpannel/>}/>
        </Routes> 
    )
}

export default AllRoutes;