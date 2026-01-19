interface User {
    id: string;
    name: string;
    phone: string;
    is_blacklisted: boolean;
    email?: string | null;
    email_verified_at?: string;
}
interface Image {
    id: string;
    path: string;
    url: string;
}
interface UserForm extends User {
    id?: string;
    roles?: null;
    is_blacklisted: boolean = false;
    password?: string;
    password_confirmation?: string;
    new_blacklist_ids?: string[];
    deleted_blacklist_ids?: string[];
    related_blacklist_ids?: string[];
}
interface UserDetail extends User {

    roles: Role[];
    blacklisted_users: User[];
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

interface RoomForm {
    id?: string;
    number: string;
    rate: number;
    description: string;
    is_ac: boolean;
    is_dormatory: boolean;
    capacity?: number;
    max_capacity?: number;
    double_bed_count: number;
    single_bed_count: number;
    staff_id: string;
    staff?: User;
    images: Image[];
    deleted_image_ids?: string[]
    image_files?: File[]
}
interface Room extends RoomForm {
    id: string;
}


interface PaginationRoom extends Pagination {
    data: Room[]
}

interface MenuItemForm {
    id?: string;
    name: string;
    category: string;
    description?: string | null;
    category: string;
    rate: number;
    unit: string;
    images?: Image[]
    new_files?: File[]
    deleted_image_ids?: string[]
}
interface MenuItem extends Omit<MenuItemForm, 'new_files' | 'deleted_image_ids'> {
    id: string;
    name: string;
    rate: number;
    unit: string;
    images: Image[]
    deleted_image_ids: string[]
}

interface PaginationMenuItem extends Pagination {
    data: MenuItem[]
}

interface AmenityForm {
    id?: string;
    name: string;
    category: string;
    description?: string | null;
    category: string;
    rate: number;
    unit: string;
    images?: Image[]
    new_files?: File[]
    deleted_image_ids?: string[]
}
interface Amenity extends Omit<AmenityForm, 'new_files' | 'deleted_image_ids'> {
    id: string;
    name: string;
    rate: number;
    unit: string;
    images: Image[]
    deleted_image_ids: string[]
}

interface PaginationAmenity extends Pagination {
    data: Amenity[]
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
    mark_as_blacklisted?: boolean;
    related_client_id?: string;
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
    new_client_phone?: string;
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
    deleted_item_ids?: string[];
    deleted_payment_ids?: string[];
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
    booking_id?: string | null;
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

interface WebsiteBookingForm {
    id?: string | null;
    name: string;
    phone: string;
    no_of_adults: number;
    no_of_children?: number | null;
}