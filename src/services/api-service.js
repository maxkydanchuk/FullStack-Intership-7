export default class apiService {

  _apiBase = "http://localhost:5000/api";

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return await res.json();
  }

  async postResource(url, data = {}) {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    // if (!res.ok) {
    //   throw new Error(`Could not fetch ${url}, status ${res.status}`);
    // }
    return await res.json();
  }

  createPerson = async (item) => {
    return await this.postResource('/people/', item);
  }


  deleteResource  = async(url, id, token) => {
    const res = await fetch(`${this._apiBase}/${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token' : token.state
      }
    });
    // if (!res.ok) {
    //   throw new Error(`Could not fetch ${url}, status ${res.status}`);
    // }
    return await res.json();
  }

  updateResource  = async(url, id, data ={}, token) => {
    const res = await fetch(`${this._apiBase}/${url}/${id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token' : token
      },
      body: JSON.stringify(data)
    });
    // if (!res.ok) {
    //   throw new Error(`Could not fetch ${url}, status ${res.status}`);
    // }
    return await res.json();
  }

  getAllPeople = async (param, query , value, currentPage, pageSize) => {

    let res = [];
    if(param && query && value) {
      res = await this.getResource(`/people?page=${currentPage}&size=${pageSize}&sortOrder=${param}&sortBy=${query}&search=${value}`)
    }
    else if(param && query) {
       res = await this.getResource(`/people?page=${currentPage}}&size=${pageSize}&sortOrder=${param}&sortBy=${query}`)
    } 
    else if(value) {
      res = await this.getResource(`/people?page=${currentPage}&size=${pageSize}&search=${value}`)
    }  else {
      res = await this.getResource(`/people?page=${currentPage}&size=${pageSize}`)
    }

    return {data:this._adaptPeople(res), totalCount: res.totalCount};
  };


  getAllStarships = async (param, query , value, currentPage, pageSize) => {

    let res = [];
    if(param && query && value) {
      res = await this.getResource(`/starships?page=${currentPage}&size=${pageSize}&sortOrder=${param}&sortBy=${query}&search=${value}`)
    }
    else if(param && query) {
       res = await this.getResource(`/starships?page=${currentPage}}&size=${pageSize}&sortOrder=${param}&sortBy=${query}`)
    } 
    else if(value) {
      res = await this.getResource(`/starships?page=${currentPage}&size=${pageSize}&search=${value}`)
    }  else {
      res = await this.getResource(`/starships?page=${currentPage}&size=${pageSize}`)
    }
    
    return {data:this._adaptStaships(res), totalCount: res.totalCount};
  };


  createStarship = async (item) => {
    return await this.postResource('/starships/', item);
  }

  getUser = async ( data ) => {
    const res = await fetch(`${this._apiBase}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token' : ''
      },
      body: JSON.stringify(data)
    })

    const response = await res.json();

    localStorage.setItem('token', await response);

    if (!res.ok) {
      throw new Error(response.error);
    }

    return response
  }

  registerUser = async (data) => {

    const res = await fetch(`${this._apiBase}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(response.error);
    }
    return await response;
  }


  _adaptPeople = (data) => {
    const result = [];
    
    data.data.forEach((person) => {
      const { _id, fields } = person;
      const {
        name,
        birth_year: birthYear,
        eye_color: eyeColor,
        height,
        gender,
        mass,
      } = fields;
      result.push({ _id, name, birthYear, eyeColor, height, gender, mass });
    });

    return result;
  };

  _adaptStaships = (data) => {
    const result = [];
    data.data.forEach((starship) => {
      const { _id, fields } = starship;
      const {
        pilots,
        MGLT,
        starship_class: starshipClass,
        hyperdrive_rating: hyperdriveRating,
 
      } = fields;
      result.push({ _id, pilots, MGLT, starshipClass, hyperdriveRating });
    });

    return result;
  };
}





