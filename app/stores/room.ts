export const useRoomStore = defineStore('room', {
  state: () => ({
    loadingGetRooms: false,
    loadingSubmitRoomForm: false,
    loadingDeleteRoom: false,
    pagination: {
      page: 1,
      pageSize: 10,
    },
    data: {} as PaginationRoom,
    form: {
    } as Room,
  }),

  actions: {
    setData(payload: PaginationRoom) {
      this.data = payload;
    },
    setPagination(payload: { page: number; pageSize: number }) {
      this.pagination = payload;
    },
    setForm(payload: Room) {
      this.form = payload;
    },
    setLoading(key: 'loadingGetRooms' | 'loadingSubmitRoomForm' | 'loadingDeleteRoom', value: boolean) {
      this[key] = value;
    }
  }
})
2