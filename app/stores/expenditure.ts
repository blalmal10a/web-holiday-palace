export const useExpenditureStore = defineStore('expenditure', {
  state: () => ({
    loadingGetExpenditures: false,
    loadingSubmitExpenditureForm: false,
    loadingDeleteExpenditure: false,
    pagination: {
      page: 1,
      pageSize: 10,
    },
    data: {} as PaginationExpenditure,
    form: {
    } as Expenditure,
  }),

  actions: {
    setData(payload: PaginationExpenditure) {
      this.data = payload;
    },
    setPagination(payload: { page: number; pageSize: number }) {
      this.pagination = payload;
    },
    setForm(payload: Expenditure) {
      this.form = payload;
    },
    setLoading(key: 'loadingGetExpenditures' | 'loadingSubmitExpenditureForm' | 'loadingDeleteExpenditure', value: boolean) {
      this[key] = value;
    }
  }
})
2