export const useInvoiceStore = defineStore('Invoice', {
  state: () => ({
    loadingGetInvoices: false,
    loadingSubmitInvoiceForm: false,
    loadingDeleteInvoice: false,
    cellIndex: null as number | null,
    openCalendarMenu: [] as boolean[],
    pagination: {
      page: 1,
      pageSize: 10,
    },
    data: {} as PaginationInvoice,
    form: {
    } as InvoiceForm,
  }),

  actions: {
    setData(payload: PaginationInvoice) {
      this.data = payload;
    },
    setPagination(payload: { page: number; pageSize: number }) {
      this.pagination = payload;
    },
    setForm(payload: InvoiceForm) {
      this.form = payload;
    },
    setLoading(key: 'loadingGetInvoices' | 'loadingSubmitInvoiceForm' | 'loadingDeleteInvoice', value: boolean) {
      this[key] = value;
    }
  }
})
2