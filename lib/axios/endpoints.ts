import http from "./http";
import { userModel, SigninModel } from "./model";

class ApiService {
  signup(data: userModel) {
    return http.post("/v1/signup", data);
  }

  signin(data: SigninModel) {
    return http.post("/v1/signin", data);
  }

  updateUser(data: userModel) {
    return http.post("/v1/user/update", data);
  }

  getUsers(): Promise<userModel[]> {
    return http.get("/v1/users");
  }
}

export default new ApiService();
