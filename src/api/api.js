import axios from 'axios'

const usersInstance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {
      'API-KEY': 'cfc0ecaf-45f7-42fe-a90e-e8beaaa989c7',
   },
})

const musicInstance = axios.create({
   baseURL: 'https://shazam.p.rapidapi.com/songs/',
   params: { key: '484129036', locale: 'en-US' },
   headers: {
      'x-rapidapi-key': '585944f843mshb17cbb9bf4f3170p1a1777jsn1d7ab2cb05a1',
      'x-rapidapi-host': 'shazam.p.rapidapi.com',
   },
})
export const usersAPI = {
   async getUsers(count = 8, page = 1) {
      return await usersInstance
         .get(`users?count=${count}&page=${page}`)
         .then(response => response.data)
         .catch(error => error)
   },
   async getProfile(userId) {
      return await usersInstance
         .get(`profile/${userId}`)
         .then(response => response.data)
         .catch(() => null)
   },
   async getStatus(userId) {
      return await usersInstance
         .get(`profile/status/${userId}`)
         .then(response => response.data)
         .catch(() => null)
   },
   async updateStatus(status) {
      return await usersInstance
         .put(`profile/status`, { status })
         .then(response => response.data)
         .catch(() => null)
   },
   async follow(userId) {
      return await usersInstance
         .post(`follow/${userId}`)
         .then(response => response.data)
         .catch(() => null)
   },
   async unfollow(userId) {
      return await usersInstance
         .delete(`follow/${userId}`)
         .then(response => response.data)
         .catch(() => null)
   },
}

export const authAPI = {
   async authMe() {
      return await usersInstance
         .get(`auth/me`)
         .then(response => response.data)
         .catch(error => null)
   },
   async login(email, password, rememberMe) {
      return await usersInstance
         .post(`auth/login`, {
            email,
            password,
            rememberMe,
         })
         .then(response => response.data)
         .catch(error => null)
   },
   async logout() {
      return await usersInstance
         .delete(`auth/login`)
         .then(response => response.data)
         .catch(error => null)
   },
}

export const musicAPI = {
   async getRecommendationsList() {
      return await musicInstance
         .get(`list-recommendations`)
         .then(response => response.data)
         .catch(error => null)
   },
}
