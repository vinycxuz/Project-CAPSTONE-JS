export default class API {

  static url = 'https://habits-kenzie.herokuapp.com/api';

  static async login(email, password) {
    const bodyObject = {
      email: email,
      password: password
    }
    await fetch(this.url + '/userLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyObject)
    })
    .then(res => res.json())
    .then(res => {
      if ("message" in res) {
        throw 'E-mail ou senha inválidos'
      } 
      if ("token" in res) {
        localStorage.setItem('@kenzie-habits:token', res.token);
        localStorage.setItem('@kenzie-habits:usrImage', res.response.usr_image);
        localStorage.setItem('@kenzie-habits:usrName', res.response.usr_name);
      }
    })
    .catch(err => console.log(err));
    
  }

  static async updateProfile(bodyObject) {
    const response = await fetch(this.url + '/user/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('@kenzie-habits:token')
      },
      body: JSON.stringify(bodyObject)
    })
    .then(res => res.json())
    .catch(err => console.log(err));

    return response;
  }

  static async createHabit(bodyObject) {
    const habitObject = await fetch(this.url + '/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('@kenzie-habits:token')
      },
      body: JSON.stringify(bodyObject)
    })
    .then(res => res.json())
    .catch(err => console.log(err));

    return habitObject;
  }

  static async getAllHabits() {
    const habitsList = await fetch(this.url + '/habits', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('@kenzie-habits:token')
      }
    })
    .then(res => res.json())
    .catch(err => console.log(err));

    return habitsList;
  }

  static async editHabit(habitId, bodyObject) {
    const newHabitObject = await fetch(`${this.url}/habits/${habitId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('@kenzie-habits:token')
      },
      body: JSON.stringify(bodyObject)
    })
    .then(res => res.json())
    .catch(err => console.log(err));

    return newHabitObject;
  }

  static async completeHabit(habitId) {
    await fetch(`${this.url}/habits/complete/${habitId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('@kenzie-habits:token')
      }
    })
    .catch(err => console.log(err));
  }

  static async deleteHabit(habitId) {
    await fetch(`${this.url}/habits/${habitId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('@kenzie-habits:token')
      }
    })
    .catch(err => console.log(err));
  }
}