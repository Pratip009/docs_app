import axios from "axios";

const BASE_URL = "https://impressive-prosperity-7cd28baf7d.strapiapp.com/api";
// const BASE_URL = "http://localhost:1337/api";


const API_KEY =
  "255410cc94f8dd21f9b3363c2dca78b7e4c6078bf6b36fb8af3031607147493b7e315c1e76b6613fea36795406e42acfa2295168d7970708eafc2a1c4733f8f393c1f7c6247ff48d1f22c54395f5a4245b058826ce5636be611b3851c7900fd9d3e999d6ff64464cd30fcea709a341417046135c2e0294b14367586f7478b886";
const axiosInstace = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer " + API_KEY,
  },
});

const getSlider = () => axiosInstace.get("/sliders?populate=*");
const getCategories = ()=>axiosInstace.get("/categories?populate=*")
const getPremiumHospitals=()=>axiosInstace.get("/hospitals?filters[Premium][$eq]=true&populate=*")
const getHospitalsByCategory=(category)=>
axiosInstace.get("hospitals?filters[categories][Name][$in]="+category+"&populate=*");
const getDoctorsByCategory=(category)=>
axiosInstace.get("doctors?filters[categories][Name][$in]="+category+"&populate=*")
const getAllDoctorList=()=>axiosInstace.get("/doctors?populate=*")
const createAppointment=(data)=>axiosInstace.post("/appointments",data)
const getAllHospital=()=>axiosInstace.get("hospitals?populate=*");

const getAllDoctors=()=>
axiosInstace.get("doctors?populate=*")
const getUserAppointments=(email)=>
axiosInstace.get("appointments?filters[email][$eq]="+email+"&populate=*");


export default {
  getSlider,
  getCategories,
  getPremiumHospitals,
  getHospitalsByCategory,
  getDoctorsByCategory,
  getAllDoctorList,
  createAppointment,
  getAllHospital,
  getAllDoctors,
  getUserAppointments
};
