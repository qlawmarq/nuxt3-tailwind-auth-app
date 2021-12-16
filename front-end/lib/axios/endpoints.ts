
import http from "./http";
import { userModel, SigninModel } from './model'

class ApiService {
//   get(): Promise<any> {
//     return http.get("/endpoint");
//   }
//   post(data: any): Promise<any> {
//     return http.post("/endpoint", data);
//   }
  signup(data: userModel): Promise<any> {
    return http.post("/signup", data);
  }
  signin(data: SigninModel): Promise<any> {
    return http.post("/signin", data);
  }
  updateUser(data: userModel): Promise<any> {
    return http.post("/user/update", data);
  }
}

export default new ApiService();