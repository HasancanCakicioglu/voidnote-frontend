
interface ErrorResponse {
    success: boolean;
    message: string;
    status: number;
    validation: Map<string, any>;
}

export default ErrorResponse