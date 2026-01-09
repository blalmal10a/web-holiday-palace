import z from "zod"
import type { ColumnDef } from '@tanstack/vue-table'
export function useBooking() {
    const store = useBookingStore()
    const router = useRouter()
    const route = useRoute()

    // storeToRefs allows us to destructure state while keeping reactivity
    const { data, form, loadingGetBookings, loadingSubmitBookingForm, loadingDeleteBooking } = storeToRefs(store)

    const fetchData = async () => {
        store.setLoading('loadingGetBookings', true)
        try {
            const response = await api.get('/bookings', {
                params: {
                    ...store.pagination
                }
            })
            store.setData(response)
        } catch (error) {
            console.error('Failed to fetch bookings', error)
        } finally {
            store.setLoading('loadingGetBookings', false)
        }
    }

    const fetchDetail = async (id?: string) => {
        const bookingId = id || route.params.id as string
        try {
            const response = await api.get(`/bookings/${bookingId}`)
            store.setForm(response)
        } catch (error) {
            console.error('Failed to fetch booking detail', error)
        }
    }
    const submitForm = async (imageFiles: File[]) => {
        store.setLoading('loadingSubmitBookingForm', true)
        try {
            let method = store.form.id ? 'PATCH' : 'POST';
            let url = `/bookings`
            if (store.form.id) {
                url = `/bookings/${store.form.id}`
            }
            const response = await api.request(url, store.form, method,)
            store.setData(response)
            router.push({ name: 'hotels-bookings' })
        } catch (error) {
            console.error('Submission failed', error)
        } finally {
            store.setLoading('loadingSubmitBookingForm', false)
        }
    }

    const deleteBooking = async (id: string) => {
        store.setLoading('loadingDeleteBooking', true)
        try {
            const response = await api.delete(`/bookings/${id}`)
            store.setData(response)
        } catch (error) {
            console.error('Delete failed', error)
        } finally {
            store.setLoading('loadingDeleteBooking', false)
        }
    }

    return {
        // State
        data,
        form,
        loadingGetBookings,
        loadingSubmitBookingForm,
        loadingDeleteBooking,
        // Actions
        fetchData,
        fetchDetail,
        submitForm,
        deleteBooking
    }
}

export const bookingFormSchema = () => {
    const baseSchema = z.object({
        id: z.string().optional(),
        client_id: z.string().min(1),
        room_id: z.string(),
        staff_id: z.string(),
        no_of_adults: z.number(),
        no_of_children: z.number(),
        check_in_date: z.string(),
        checkout_date: z.string(),
        deposit: z.number(),
    }) satisfies z.ZodType<BookingForm>
    return baseSchema;
}

// 2. Export Columns (Used in Table components)
export const bookingColumns: ColumnDef<any>[] = [
    { header: 'Booking no.', accessorKey: 'name' },
    {
        header: 'Staff',
        accessorFn: (row) => row.staff?.name ?? 'N/A',
        // 
    },
    {
        header: 'Rate',
        cell: ({ row }) => `${toRupees(row.original.rate)}`,
    },
    { id: 'actions' }
]