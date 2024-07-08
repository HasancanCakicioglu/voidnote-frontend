
interface ErrorResponse {
    success: boolean;
    message: string;
    status: number;
    data:any;
    validation: Map<string, any>;
}

export default ErrorResponse