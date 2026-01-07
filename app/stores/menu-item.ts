export const useMenuItemStore = defineStore('menuItem', {
  state: () => ({
    loadingGetMenuItems: false,
    loadingSubmitMenuItemForm: false,
    loadingDeleteMenuItem: false,
    pagination: {
      page: 1,
      pageSize: 10,
    },
    data: {} as PaginationMenuItem,
    form: {
    } as MenuItem,
  }),

  actions: {
    setData(payload: PaginationMenuItem) {
      this.data = payload;
    },
    setPagination(payload: { page: number; pageSize: number }) {
      this.pagination = payload;
    },
    setForm(payload: MenuItem) {
      this.form = payload;
    },
    setLoading(key: 'loadingGetMenuItems' | 'loadingSubmitMenuItemForm' | 'loadingDeleteMenuItem', value: boolean) {
      this[key] = value;
    }
  }
})
2