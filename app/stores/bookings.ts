import { addDays, format } from "date-fns";

export const useBookingStore = defineStore('booking', {
  state: () => ({
    loadingGetBookings: false,
    loadingSubmitBookingForm: false,
    loadingDeleteBooking: false,
    cellIndex: null as number | null,
    openCalendarMenu: [] as boolean[],
    pagination: {
      page: 1,
      pageSize: 10,
      start: format(new Date(), 'yyyy-MM-dd'),
      end: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
      where: [] as Record<string, string | number | boolean>[] | null | undefined,
      is_dormatory: undefined as boolean | undefined,
    },
    data: {} as PaginationBooking,
    form: {
    } as BookingForm,
    detail: {} as BookingDetail,
    selectedClient: {} as User,
    selectedRoom: {} as Room,
    availableBedList: [] as Bed[],
  }),

  actions: {
    setData(payload: PaginationBooking) {
      this.data = payload;
    },
    setPagination(payload: typeof this.pagination) {
      this.pagination = payload;
    },
    setForm(payload: BookingForm) {
      this.form = payload;
    },
    setLoading(key: 'loadingGetBookings' | 'loadingSubmitBookingForm' | 'loadingDeleteBooking', value: boolean) {
      this[key] = value;
    }
  }
})
2