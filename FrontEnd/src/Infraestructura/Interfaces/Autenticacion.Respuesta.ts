export interface AutenticacionRespuesta {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
    token:    string;
}
