export const defaultUserPagination = {
  page: 1,
  pageSize: 10,
  exclude_clients: false,
  exclude_staff: false,
  exclude_admin: false,
  only_blacklisted: false,
}
export const useUserStore = defineStore('user', {
  state: () => ({
    loadingGetUsers: false,
    loadingGetDetails: false,
    loadingSubmitUserForm: false,
    loadingDeleteUser: false,
    update_password: false,
    showBlacklistedUserModal: false,
    pagination: {
      ...defaultUserPagination
    },
    data: {} as PaginationUser,

    form: {
      name: '',
      phone: '',
      is_blacklisted: false,
      email: null,
      password: '',
      password_confirmation: '',
    } as UserForm,
    detail: {
      name: '',
      email: '',
      phone: ''
    } as UserDetail,
    params: {
      phone: undefined as string | undefined,
    }
  }),

  actions: {
    setData(payload: PaginationUser) {
      this.data = payload;
    },
    setForm(payload: UserForm) {
      this.form = payload;
    },
    setPagination(payload: typeof defaultUserPagination) {
      this.pagination = payload;
    },
    setLoading(key: 'loadingGetUsers' | 'loadingSubmitUserForm' | 'loadingDeleteUser' | 'loadingGetDetails', value: boolean) {
      this[key] = value;
    },
    setUpdatePassword(value: boolean) {
      this.update_password = value;
    },
  }
})
2