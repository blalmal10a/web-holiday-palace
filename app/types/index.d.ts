interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null | undefined;
    phone: string | null | undefined;
    roles: Role[];
}

interface Role {
    id: number;
    name: string;
    guard_name: string;
    pivot: {
        model_type: string;
        model_id: number;
        role_id: number;
    }
}

