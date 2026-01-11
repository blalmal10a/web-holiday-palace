interface User {
    id: string;
    name: string;
    email: string;
    email_verified_at?: string;
    phone?: string;
    roles: Role[];
}
interface Image {
    id: string;
    path: string;
    url: string;
}
interface UserForm extends User {
    id?: string;
    roles?: null;
    password: string;
    password_confirmation: string;
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

interface Room {
    id: string;
    name: string;
    rate: number;
    staff_id: string;
    staff?: User;
    images: Image[];
}

interface RoomForm {
    id?: string;
    name: string;
    rate: number;
    staff_id: string;
    staff?: User;
    images: Image[];
    deleted_image_ids: string[]
    image_files: File[]
}

interface PaginationRoom extends Pagination {
    data: Room[]
}

interface MenuItem {
    id: string;
    name: string;
    rate: number;
    unit: string;
    images: Image[]
    new_files: File[]
    deleted_image_ids: string[]
}

interface PaginationMenuItem extends Pagination {
    data: MenuItem[]
}

interface Expenditure {
    id: string;
    item: string;
    rate: number;
    quantity: number;
    amount: number;
    date: string;
    staff_id: string;
    staff: User;
    name: string;
    phone: string;
}

interface ExpenditureForm extends Omit<Expenditure, 'staff'> {
    id?: string;
    staff_id?: string
    name?: string;
    phone?: string;
}

interface PaginationExpenditure extends Pagination {
    data: Expenditure[]
}


interface Booking {
    id: string;
    client_id: string;
    client: User;
    staff_id: string;
    staff: User;
    no_of_adults: number;
    no_of_children: number;
    room_id: string;
    room: Room;
    check_in_date: string;
    checkout_date: string;
    deposit: number;
    date_list?: string[];
    invoice: Invoice;
}

interface BookingForm extends Omit<Booking, 'client' | 'staff' | 'room' | 'invoice'> {
    id?: string;
    client?: User;
    staff?: User;
    room?: Room;
    date_list: string[];
    invoice?: Invoice;
}

interface PaginationBooking extends Pagination {
    data: Booking[]
}

interface CalendarData {
    room: Room;
    bookingInfo?: BookingForm;
    date: string;
    start_cell: boolean;
    end_cell: boolean;
    cellLength: number;
}

interface Invoice {
    id: string;
    invoice_no: string;
    date: string;
    booking_id: string;
    booking: Booking;
    sub_total_amount: number;
    total_amount: number;
    discount_amount: number;
    discount_percent: number;
    items: InvoiceItem[];
}


interface InvoiceItem {
    id: string;
    invoice_id: string;
    invoice: Invoice;
    booking_id: string;
    booking: Booking;
    description: string;
    quantity: number;
    unit: string;
    rate: number;
}

interface InvoiceForm extends Omit<Invoice, 'booking' | 'invoice_no'> {
    id?: string;
    items: InvoiceItemForm[];
    deleted_item_ids?: string[];
}

interface PaginationInvoice extends Pagination {
    data: Invoice[]
}
interface InvoiceItemForm extends Omit<InvoiceItem, 'invoice' | 'booking'> {
    id?: string;
    invoice_id: string;
    booking_id?: string;
    description: string;
    quantity: number;
    unit?: string;
    rate: number;
}