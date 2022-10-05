import http from "./http";
import { userModel, SigninModel } from "./model";

class ApiService {
  //   get(): Promise<any> {
  //     return http.get("/endpoint");
  //   }
  //   post(data: any): Promise<any> {
  //     return http.post("/endpoint", data);
  //   }
  signup(data: userModel): Promise<any> {
    return http.post("/v1/signup", data);
  }
  signin(data: SigninModel): Promise<any> {
    return http.post("/v1/signin", data);
  }
  updateUser(data: userModel): Promise<any> {
    return http.post("/v1/user/update", data);
  }
  getUsers(): Promise<any> {
    return http.get("/v1/users");
  }
}

export default new ApiService();
