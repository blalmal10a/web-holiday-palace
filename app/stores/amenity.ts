export const useAmenityStore = defineStore('amenity', {
  state: () => ({
    loadingGetAmenities: false,
    loadingSubmitAmenityForm: false,
    loadingDeleteAmenity: false,
    pagination: {
      page: 1,
      pageSize: 10,
      only_accommodations: false,
      exclude_accommodations: false,
    },
    data: {} as PaginationAmenity,
    form: {
    } as Amenity,
  }),

  actions: {
    setData(payload: PaginationAmenity) {
      this.data = payload;
    },
    setPagination(payload: typeof this.pagination) {
      this.pagination = payload;
    },
    setForm(payload: Amenity) {
      this.form = payload;
    },
    setLoading(key: 'loadingGetAmenities' | 'loadingSubmitAmenityForm' | 'loadingDeleteAmenity', value: boolean) {
      this[key] = value;
    }
  }
})
2