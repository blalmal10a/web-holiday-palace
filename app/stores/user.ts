export const useUserStore = defineStore('user', {
  state: () => ({
    loadingGetUsers: false,
    loadingSubmitUserForm: false,
    loadingDeleteUser: false,
    update_password: false,
    pagination: {
      page: 1,
      pageSize: 10,
      exclude_clients: false,
      exclude_staff: false,
      exclude_admin: false,
    },
    data: {} as PaginationUser,
    form: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    } as UserForm,
  }),

  actions: {
    setData(payload: PaginationUser) {
      this.data = payload;
    },
    setForm(payload: UserForm) {
      this.form = payload;
    },
    setPagination(payload: { page: number; pageSize: number; exclude_clients: boolean; exclude_staff: boolean; exclude_admin: boolean }) {
      this.pagination = payload;
    },
    setLoading(key: 'loadingGetUsers' | 'loadingSubmitUserForm' | 'loadingDeleteUser', value: boolean) {
      this[key] = value;
    },
    setUpdatePassword(value: boolean) {
      this.update_password = value;
    },
  }
})
2