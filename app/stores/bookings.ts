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
    },
    data: {} as PaginationBooking,
    form: {
    } as BookingForm,
  }),

  actions: {
    setData(payload: PaginationBooking) {
      this.data = payload;
    },
    setPagination(payload: { page: number; pageSize: number }) {
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