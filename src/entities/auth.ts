
interface RegisterData {
    username: string;
    email: string;
    password: string;
}
  

interface VerifyRegisterData {
    email: string;
    verificationCode: string;
}

interface LoginData{
    email: string;
    password: string;
}