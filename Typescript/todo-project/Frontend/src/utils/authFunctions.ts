import axios from "axios"

export async function loginUser(email: string, password: string) {
  const response = await axios.post('/auth/login', {
    username:email,
    password
  })

  const responseToken = response.data.token
  let authToken = ""
  if (responseToken) {
    authToken = responseToken
    localStorage.setItem('token', responseToken)
  }

  return { userId: response.data.userId, authToken }
}

export async function registerUser(email: string, password: string) {
  await axios.post('/auth/register', {
    username: email,
    password
  })
}