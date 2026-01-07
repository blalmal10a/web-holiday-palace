export const useUserStore = defineStore('user', {
  state: () => ({
    loadingGetUsers: false,
    loadingSubmitUserForm: false,
    loadingDeleteUser: false,
    pagination: {
      page: 1,
      pageSize: 10,
    },
    data: {} as PaginationUser,
    form: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    } as UserForm,
  }),

  actions: {
    setData(payload: PaginationUser) {
      this.data = payload;
    },
    setForm(payload: UserForm) {
      this.form = payload;
    },
    setPagination(payload: { page: number; pageSize: number }) {
      this.pagination = payload;
    },
    setLoading(key: 'loadingGetUsers' | 'loadingSubmitUserForm' | 'loadingDeleteUser', value: boolean) {
      this[key] = value;
    }
  }
})
2