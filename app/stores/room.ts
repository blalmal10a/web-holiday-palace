export const useRoomStore = defineStore('room', {
  state: () => ({
    loadingGetRooms: false,
    loadingSubmitRoomForm: false,
    loadingDeleteRoom: false,
    data: {} as PaginationRoom,
    form: {
    } as Room,
  }),

  actions: {
    // Basic setters to update state from the composable
    setData(payload: PaginationRoom) {
      this.data = payload;
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