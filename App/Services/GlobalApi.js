import axios from "axios";

const BASE_URL = "https://doc-back-new.onrender.com/api";
// https://doc-back-new.onrender.com/

const API_KEY =
  // "6a82c8b94a42bf66bacff71b20a276f64a1cadde91b1f92106cf54e60d68a8d1e4f955e2e1f30ba84d663eb964eb083133d2b33a0959dbc58153b6d188b4401499bd75da25c95579dab86da7ad88d88e06e86fbb7b80136d25a741e5d49f1f968dfd46e41c66971d6e81819f9a155f3070fae53d4fcc8bb640cf3f24269b3361";
  "9be33c1b8c3a6ba630dce3c29b747aba8d765dfb37102935e1829611dc3dfc5793e4bccb20be7e63e2f7f6bfbfdb7164648c068a36eed50204d216cb7e491bd89654d43408bb0f94891b553d3ead81810f7b0a976471877b64103dc31df682a5ec9a6bc6a3be6abbad0f4c2781b369ca9ef6ca298b0813eb2cfec1f7df555896";
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

const createHospitalAppointment = (data) =>
  axiosInstace.post("/hospital-appointments", data);

const getAllHospital = () => axiosInstace.get("/hospitals/?populate=*");
const getOneHospital = (id) => axiosInstace.get("/hospitals?3&populate=*");

const getAllDoctors = () => axiosInstace.get("doctors?populate=*");
const getUserAppointments = (email) =>
  axiosInstace.get(
    "hospital-appointments?filters[email][$eq]=" + email + "&populate=*"
  );
const getUserDoctorAppointment = (email) =>
  axiosInstace.get(
    "doctors-appointments?filters[email][$eq]=" + email + "&populate=*"
  );
const getConsultedTime = (data) =>
  axiosInstace.get("/consultant-times?populate=*", data);

const createDoctorAppointment = (data) =>
  axiosInstace.post("/doctors-appointments", data);
const createReport = () => axiosInstace.post("/reports", data);

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
  getUserDoctorAppointment,
  createReport,
};
