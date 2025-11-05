import axios from 'axios';

const BASE_URL = 'http://192.168.100.61:5000/api/auth';

export const signupUserApi = async (data) => {
  // return await axios.post(`${BASE_URL}/signup`, data);
  console.log('Signup API Placeholder:', data);
};

// export const signupUserApi = async (data) => {
//   const res = await axios.post(`${BASE_URL}/signup`, data);
//   return res.data;
// };

export const verifyOtpApi = async (data) => {
  // return await axios.post(`${BASE_URL}/verify-otp`, data);
  console.log('OTP Verification Placeholder:', data);
};

// export const verifyOtpApi = async (data) => {
//   const res = await axios.post(`${BASE_URL}/verify-otp`, data);
//   return res.data;
// };

export const loginUserApi = async (data) => {
  // return await axios.post(`${BASE_URL}/login`, data);
  console.log('Login API Placeholder:', data);
};
