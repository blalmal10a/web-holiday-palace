import z from "zod"
import type { ColumnDef } from '@tanstack/vue-table'
import { addDays, differenceInDays } from 'date-fns'
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
            notifyError(error);
            console.error('Failed to fetch bookings', error)
        } finally {
            store.setLoading('loadingGetBookings', false)
        }
    }

    const fetchDetail = async (id?: string) => {
        const bookingId = id || route.params.id as string
        try {
            const response: Booking = await api.get(`/bookings/${bookingId}`)
            let checkinDate = response.check_in_date
            let checkoutDate = response.checkout_date
            response.date_list = []

            let bookingForm = response as BookingForm;
            store.detail = bookingForm as BookingDetail
            store.setForm(bookingForm)
        } catch (error) {
            notifyError(error);
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
            if (useRoute().name === 'hotels-calendar') {
                useCalendarStore().$reset();
                useCalendarStore().initCalendar(useRoomStore().data.data, useBookingStore().data.data);
                useCalendarStore().showBookingForm = false;
            } else {
                router.push({ name: 'hotels-bookings' })
            }
        } catch (error) {
            notifyError(error);
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
            notifyError(error);
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
        deleteBooking,
    }
}

export const bookingFormSchema = (newClient: boolean,) => {
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
        date_list: z.array(z.string()),
        new_client_name: z.string().optional(),
        new_client_phone: z.string().optional(),
    }) satisfies z.ZodType<BookingForm>

    return baseSchema
        .refine((data) => {
            return !(newClient && !data.new_client_phone)
        }, {
            message: "Phone is required",
            path: ["new_client_phone"]
        })
}

// 2. Export Columns (Used in Table components)
export const bookingColumns: ColumnDef<any>[] = [
    {
        header: 'Client',
        accessorFn: (row) => row.client?.name ?? 'N/A',
        // 
    },
    {
        header: 'Check-in',
        accessorFn: (row) => row.check_in_date,
    },
    {
        header: 'Check-out',
        accessorFn: (row) => row.checkout_date,
    },
    // {
    //     header: 'Staff',
    //     accessorFn: (row) => row.staff?.name ?? 'N/A',
    //     // 
    // },
    { id: 'actions' }
]
export function getBookingDateList(checkInDate: string, checkOutDate: string) {
    let diff = differenceInDays(checkOutDate, checkInDate);
    let currentDate = checkInDate;
    let dateList = [];
    for (let dateCount = 0; dateCount < diff + 1; dateCount++) {
        dateList.push(currentDate)
        currentDate = addDays(currentDate, 1).toISOString().split('T')[0]!
    }
    return dateList;
}
export const mapBooking = (bookings: Booking[]) => {
    let mappedBookings: Record<string, BookingDetail> = {}
    bookings.forEach(booking => {
        let dateList = getBookingDateList(booking.check_in_date, booking.checkout_date)
        if (dateList) {
            dateList.forEach(date => {
                let key = booking.room_id
                key = `${key}-${date}`
                mappedBookings[key] = booking as BookingDetail;
            });
        }
    });
    return mappedBookings
}