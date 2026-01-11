export const usePaymentStore = defineStore('Payment', {
    state: () => ({
        loadingGetPayments: false,
        loadingSubmitPaymentForm: false,
        loadingDeletePayment: false,
        showPaymentItemFormModal: false,
        showPaymentPaymentFormModal: false,
        showPaymentFormModal: false,
        cellIndex: null as number | null,
        openCalendarMenu: [] as boolean[],
        pagination: {
            page: 1,
            pageSize: 10,
        },
        data: {} as PaginationPayment,
        form: {
        } as PaymentForm,
        detail: {} as PaymentDetail
    }),

    actions: {
        setData(payload: PaginationPayment) {
            this.data = payload;
        },
        setPagination(payload: { page: number; pageSize: number }) {
            this.pagination = payload;
        },
        setForm(payload: PaymentForm) {
            this.form = payload;
        },
        setLoading(key: 'loadingGetPayments' | 'loadingSubmitPaymentForm' | 'loadingDeletePayment', value: boolean) {
            this[key] = value;
        }
    }
})
2