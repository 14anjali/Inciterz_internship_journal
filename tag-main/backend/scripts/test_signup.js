import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/signup';

const signupUser = async () => {
  const user = {
    name: "New Test User",
    userid: `user_${Date.now()}`,
    email: `test_user_${Date.now()}@example.com`,
    password: "Password123!",
    role: "user",
    dob: "1990-01-01",
    gender: "male"
  };

  console.log('Attempting to sign up user:', user.email);

  try {
    const response = await axios.post(API_URL, user);
    console.log('✅ Signup successful!');
    console.log('Response:', response.data);
    console.log('\n--> Check the backend terminal/logs for the Ethereal Email Preview URL <--');
  } catch (error) {
    console.error('❌ Signup failed:', error.response ? error.response.data : error.message);
  }
};

signupUser();
