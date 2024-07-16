import SuccessResponse from "./api_success";

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}
  

export interface VerifyRegisterData {
    email: string;
    verificationCode: string;
}

export interface LoginData{
    email: string;
    password: string;
}

export interface loginSuccessResponse extends SuccessResponse{
    data: { email: string, profilePhotoUrl: string};
} 