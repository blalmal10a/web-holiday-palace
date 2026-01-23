export const useMenuItemStore = defineStore('menuItem', {
  state: () => ({
    loadingGetMenuItems: false,
    loadingSubmitMenuItemForm: false,
    loadingDeleteMenuItem: false,
    pagination: {
      page: 1,
      pageSize: 10,
      only_accommodations: false,
      exclude_accommodations: false,
    },
    data: {} as PaginationMenuItem,
    form: {
    } as MenuItem,
    categories: [] as string[],
    units: [] as string[],
  }),

  actions: {
    setData(payload: PaginationMenuItem) {
      this.data = payload;
    },
    setPagination(payload: typeof this.pagination) {
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