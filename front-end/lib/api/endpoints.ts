
import http from "./http";

class ApiService {
//   get(): Promise<any> {
//     return http.get("/endpoint");
//   }
//   post(data: any): Promise<any> {
//     return http.post("/endpoint", data);
//   }
// TODO: Remove any type
  signup(data: any): Promise<any> {
    return http.post("/signup", data);
  }
  signin(data: any): Promise<any> {
    return http.post("/signin", data);
  }
  updateUser(data: any): Promise<any> {
    return http.post("/user/update", data);
  }
}

export default new ApiService();