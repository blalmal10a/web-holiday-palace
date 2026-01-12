interface User {
    id: string;
    name: string;
    email?: string;
    email_verified_at?: string;
    phone: string;
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
interface UserDetail extends User {
    id: string;
    name: string;
    email?: string;
    email_verified_at?: string;
    phone: string;
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

interface BookingForm extends Omit<Booking, 'client' | 'staff' | 'room' | 'invoice'> {
    id?: string;
    client_id: string;
    staff_id: string;
    no_of_adults: number;
    no_of_children: number;
    room_id: string;
    check_in_date: string;
    checkout_date: string;
    deposit: number;
}
interface Booking extends BookingForm {
    id: string;
    client_id: string;
    client?: User;
    staff_id: string;
    staff?: User;
    no_of_adults: number;
    no_of_children: number;
    room_id: string;
    room?: Room;
    check_in_date: string;
    checkout_date: string;
    deposit: number;
    date_list?: string[];
    invoice?: Invoice;
    new_client_name?: string;
    new_client_email?: string;
}

interface BookingDetail extends Booking {
    client: User;
    staff: User;
    room: Room;
    invoice: Invoice;
    date_list: string[];
}



interface PaginationBooking extends Pagination {
    data: Booking[]
}

interface CalendarData {
    room: Room;
    bookingInfo?: BookingDetail;
    date: string;
    start_cell: boolean;
    end_cell: boolean;
    cellLength: number;
}


interface InvoiceForm {
    id?: string;
    invoice_no?: string;
    date: string;
    booking_id: string;
    sub_total_amount: number;
    total_amount: number;
    discount_amount: number;
    discount_percent: number;
    items: InvoiceItemForm[];
    payments: PaymentForm[];
}
interface Invoice extends InvoiceForm {
    id: string;
    invoice_no: string;
    booking: Booking;
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

interface PaymentForm {
    id?: string;
    invoice_id: string;
    booking_id?: string;
    amount: number;
    date: string;
    mode: string;
}
interface Payment extends PaymentForm {
    id: string;
    invoice?: Invoice;
    image?: Image;
}
interface PaymentDetail extends Payment {
    id: string;
    invoice_id: string;
    booking_id?: string;
    amount: number;
    date: string;
    mode: string;
    invoice: Invoice;
    image: Image;
}
interface PaginationPayment extends Pagination {
    data: Payment[];
}