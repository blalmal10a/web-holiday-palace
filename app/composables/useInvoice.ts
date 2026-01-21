import z from "zod"
import type { ColumnDef } from '@tanstack/vue-table'
import { addDays, differenceInDays, format } from 'date-fns'
export function useInvoice() {
    const store = useInvoiceStore()
    const router = useRouter()
    const route = useRoute()

    // storeToRefs allows us to destructure state while keeping reactivity
    const { data, form, loadingGetInvoices, loadingSubmitInvoiceForm, loadingDeleteInvoice } = storeToRefs(store)

    const fetchData = async () => {
        store.setLoading('loadingGetInvoices', true)
        try {
            const response = await api.get('/invoices', {
                params: {
                    ...store.pagination
                }
            })
            store.setData(response)
        } catch (error) {
            notifyError(error);
            console.error('Failed to fetch invoices', error)
        } finally {
            store.setLoading('loadingGetInvoices', false)
        }
    }

    const fetchDetail = async (id?: string) => {
        const invoiceId = id || route.params.id as string
        try {
            const response: Invoice = await api.get(`/invoices/${invoiceId}`)
            let invoiceForm = response as InvoiceForm;
            store.setForm(invoiceForm)
        } catch (error) {
            notifyError(error);
            console.error('Failed to fetch invoice detail', error)
        }
    }
    const submitForm = async (imageFiles: File[]) => {
        store.setLoading('loadingSubmitInvoiceForm', true)
        try {
            let method = store.form.id ? 'PATCH' : 'POST';
            let url = `/invoices`
            if (store.form.id) {
                url = `/invoices/${store.form.id}`
            }
            const response = await api.request(url, store.form, method,)
            store.setData(response)

            useCalendarStore().$reset();
            useCalendarStore().initCalendar(useRoomStore().data.data, useBookingStore().data.data);
            store.showInvoiceFormModal = false;
        } catch (error) {
            notifyError(error);
            console.error('Submission failed', error)
        } finally {
            store.setLoading('loadingSubmitInvoiceForm', false)
        }
    }

    const deleteInvoice = async (id: string) => {
        store.setLoading('loadingDeleteInvoice', true)
        try {
            const response = await api.delete(`/invoices/${id}`)
            store.setData(response)
        } catch (error) {
            notifyError(error);
            console.error('Delete failed', error)
        } finally {
            store.setLoading('loadingDeleteInvoice', false)
        }
    }

    return {
        // State
        data,
        form,
        loadingGetInvoices,
        loadingSubmitInvoiceForm,
        loadingDeleteInvoice,
        // Actions
        fetchData,
        fetchDetail,
        submitForm,
        deleteInvoice,
    }
}

export const InvoiceFormSchema = () => {
    return z.object({
        id: z.string().optional(),
        invoice_no: z.string().min(1),
        date: z.string(),
        booking_id: z.string(),
        sub_total_amount: z.number(),
        total_amount: z.number(),
        discount_amount: z.number(),
        discount_percent: z.number(),
        items: z.array(
            invoiceItemFormSchema()
        ),
        payments: z.array(paymentFormSchema())
    }) satisfies z.ZodType<InvoiceForm>;
};

// 2. Export Columns (Used in Table components)
export const invoiceColumns: ColumnDef<Invoice>[] = [
    {
        header: 'Invoice no.',
        accessorFn: (row) => row.invoice_no
        // 
    },
    {
        header: 'Client',
        accessorFn: (row) => row.booking.client?.name,
    },
    {
        header: 'Date',
        accessorFn: (row) => format(row.date, 'Do MMM, yyyy'),
    },
    { id: 'actions' }
]
export function getInvoiceDateList(checkInDate: string, checkOutDate: string) {
    let diff = differenceInDays(checkOutDate, checkInDate);
    let currentDate = checkInDate;
    let dateList = [];
    for (let dateCount = 0; dateCount < diff + 1; dateCount++) {
        dateList.push(currentDate)
        currentDate = addDays(currentDate, 1).toISOString().split('T')[0]!
    }
    return dateList;
}