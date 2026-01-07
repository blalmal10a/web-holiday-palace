export const useUserStore = defineStore('user', {
  state: () => ({
    loadingGetUsers: false,
    loadingSubmitUserForm: false,
    loadingDeleteUser: false,
    data: {} as PaginationUser,
    form: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    } as UserForm,
  }),

  actions: {
    // Basic setters to update state from the composable
    setUsers(payload: PaginationUser) {
      this.data = payload;
    },
    setForm(payload: UserForm) {
      this.form = payload;
    },
    setLoading(key: 'loadingGetUsers' | 'loadingSubmitUserForm' | 'loadingDeleteUser', value: boolean) {
      this[key] = value;
    }
  }
})
2