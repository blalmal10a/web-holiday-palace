import z from "zod"
import type { ColumnDef } from '@tanstack/vue-table'
import { addDays, differenceInDays, format } from 'date-fns'
export function usePayment() {
    const store = usePaymentStore()
    const router = useRouter()
    const route = useRoute()

    // storeToRefs allows us to destructure state while keeping reactivity
    const { data, form, loadingGetPayments, loadingSubmitPaymentForm, loadingDeletePayment } = storeToRefs(store)

    const fetchData = async () => {
        store.setLoading('loadingGetPayments', true)
        try {
            const response = await api.get('/payments', {
                params: {
                    ...store.pagination
                }
            })
            store.setData(response)
        } catch (error) {
            notifyError(error);
            console.error('Failed to fetch payments', error)
        } finally {
            store.setLoading('loadingGetPayments', false)
        }
    }

    const fetchDetail = async (id?: string) => {
        const paymentId = id || route.params.id as string
        try {
            const response: Payment = await api.get(`/payments/${paymentId}`)
            let paymentForm = response as PaymentForm;
            store.setForm(paymentForm)
        } catch (error) {
            notifyError(error);
            console.error('Failed to fetch payment detail', error)
        }
    }
    const submitForm = async (imageFiles: File[]) => {
        store.setLoading('loadingSubmitPaymentForm', true)
        try {
            let method = store.form.id ? 'PATCH' : 'POST';
            let url = `/payments`
            if (store.form.id) {
                url = `/payments/${store.form.id}`
            }
            const response = await api.request(url, store.form, method,)
            store.setData(response)

            useCalendarStore().$reset();
            useCalendarStore().initCalendar(useRoomStore().data.data, useBookingStore().data.data);
            store.showPaymentFormModal = false;
        } catch (error) {
            notifyError(error);
            console.error('Submission failed', error)
        } finally {
            store.setLoading('loadingSubmitPaymentForm', false)
        }
    }

    const deletePayment = async (id: string) => {
        store.setLoading('loadingDeletePayment', true)
        try {
            const response = await api.delete(`/payments/${id}`)
            store.setData(response)
        } catch (error) {
            notifyError(error);
            console.error('Delete failed', error)
        } finally {
            store.setLoading('loadingDeletePayment', false)
        }
    }
    const addPayment = (payment: PaymentForm) => {
        useInvoiceStore().form.payments.push(payment);
        useInvoiceStore().showInvoicePaymentFormModal = false;
    }
    return {
        // State
        data,
        form,
        loadingGetPayments,
        loadingSubmitPaymentForm,
        loadingDeletePayment,
        // Actions
        fetchData,
        fetchDetail,
        submitForm,
        deletePayment,
        addPayment
    }
}

export const paymentFormSchema = () => {
    return z.object({
        id: z.string().optional(),
        invoice_id: z.string(),
        booking_id: z.string().optional().nullable(),
        amount: z.number(),
        date: z.string(),
        mode: z.string(),
    }) satisfies z.ZodType<PaymentForm>;
};

// 2. Export Columns (Used in Table components)
export const paymentColumns: ColumnDef<PaymentDetail>[] = [
    {
        header: 'Date',
        accessorFn: (row) => format(row.date, 'Do MMM, yyyy'),
    },
    {
        header: 'Amount',
        accessorFn: (row) => row.amount
    },
    {
        header: 'Mode',
        accessorFn: (row) => row.mode
    },
    { id: 'actions' }
]
export function getPaymentDateList(checkInDate: string, checkOutDate: string) {
    let diff = differenceInDays(checkOutDate, checkInDate);
    let currentDate = checkInDate;
    let dateList = [];
    for (let dateCount = 0; dateCount < diff + 1; dateCount++) {
        dateList.push(currentDate)
        currentDate = addDays(currentDate, 1).toISOString().split('T')[0]!
    }
    return dateList;
}