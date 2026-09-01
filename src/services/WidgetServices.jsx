import axios from "axios";

const API_URL = async (latitude, longitude) => {
  return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
};

export const getAllWeather = async (latitude, longitude) => {
  const url = await API_URL(latitude, longitude);
  const response = await axios.get(url);
  return response.data;
};