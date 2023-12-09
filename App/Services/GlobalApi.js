import axios from "axios";

const BASE_URL = "http://192.168.1.103:1337/api";
const API_KEY =
  "c04fd7607dd4c554fe79f5f1564e8cccb28279b8fb6c394a45106b00ef321af74cb17b6635223d99f09ac5880c83906852711d5131701bb55aaba26ae25ecb96895663e0f544359d6b65a9dd90fd3e54ac8d8db3dfa136d7855b4fdd047b20ab77f8f095b40726fcb4908666b202bad8f7677f87a721caef0b0bfbdddd393780";
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
