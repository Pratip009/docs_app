import axios from "axios";

const BASE_URL = "http://192.168.1.104:1337/api";
// const BASE_URL = "http://localhost:1337/api";

const API_KEY =
  "6a82c8b94a42bf66bacff71b20a276f64a1cadde91b1f92106cf54e60d68a8d1e4f955e2e1f30ba84d663eb964eb083133d2b33a0959dbc58153b6d188b4401499bd75da25c95579dab86da7ad88d88e06e86fbb7b80136d25a741e5d49f1f968dfd46e41c66971d6e81819f9a155f3070fae53d4fcc8bb640cf3f24269b3361";
const axiosInstace = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer " + API_KEY,
  },
});

const getSlider = () => axiosInstace.get("/sliders?populate=*");
const getCategories = () => axiosInstace.get("/categories?populate=*");
const getPremiumHospitals = () =>
  axiosInstace.get("/hospitals?filters[Premium][$eq]=true&populate=*");
const getHospitalsByCategory = (category) =>
  axiosInstace.get(
    "hospitals?filters[categories][Name][$in]=" + category + "&populate=*"
  );
const getDoctorsByCategory = (category) =>
  axiosInstace.get(
    "doctors?filters[categories][Name][$in]=" + category + "&populate=*"
  );
const getAllDoctorList = () => axiosInstace.get("/doctors?populate=*");
const createAppointment = (data) => axiosInstace.post("/appointments", data);

const createHospitalAppointment = (data) => axiosInstace.post("/hospital-appointments", data);

const getAllHospital = () => axiosInstace.get("/hospitals/?populate=*");
const getOneHospital = (id) => axiosInstace.get("/hospitals?3&populate=*");

const getAllDoctors = () => axiosInstace.get("doctors?populate=*",);
const getUserAppointments = (email) =>
  axiosInstace.get("hospital-appointments?filters[email][$eq]=" + email + "&populate=*");

const getConsultedTime = (data) =>
  axiosInstace.get("/consultant-times?populate=*", data);
  // http://192.168.1.104:1337/api/hospitals/?populate[doctors][populate]=*

  const createDoctorAppointment = (data) => axiosInstace.post("/doctors-appointments", data);


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
  getUserAppointments,
  getConsultedTime,
  getOneHospital,
  createDoctorAppointment,
  createHospitalAppointment,
};
