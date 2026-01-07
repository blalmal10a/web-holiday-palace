interface User {
    id: string;
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

interface Pagination {
    current_page: number;
    data: any[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        page: number | null;
        active: boolean;
    }
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface PaginationUser extends Pagination {
    data: User[]
}