import axios from'axios'
export default new class ApiService {
    
    BASE_URL="https://jsonplaceholder.typicode.com/users";
   
    getListApi(){
        return axios.get(`${this.BASE_URL}`);
    }
    
}