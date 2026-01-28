export const useRoomStore = defineStore('room', {
  state: () => ({
    loadingGetRooms: false,
    loadingSubmitRoomForm: false,
    loadingDeleteRoom: false,
    pagination: {
      page: 1,
      pageSize: 10,
      is_dormatory: undefined as boolean | undefined,
    },
    data: {} as PaginationRoom,
    form: {
    } as RoomForm,
  }),

  actions: {
    setData(payload: PaginationRoom) {
      this.data = payload;
    },
    setPagination(payload: typeof this.pagination) {
      this.pagination = {
        ...payload,
        ...this.pagination
      };
    },
    setForm(payload: RoomForm) {
      this.form = payload;
    },
    setLoading(key: 'loadingGetRooms' | 'loadingSubmitRoomForm' | 'loadingDeleteRoom', value: boolean) {
      this[key] = value;
    }
  }
})

// export function formatDorm(dorm: Room, bookings: BookingDetail[]) {
//   const startDate = useBookingStore().pagination.start;
//   const endDate = useBookingStore().pagination.end;
//   const dateList = getBookingDateList(startDate, endDate);
//   //first column of each row is separate bed
//   // date starts from the second column

//   //   interface DormCalendar {
//   //     bed: Bed;
//   //     bookingInfo?: BookingDetail;
//   //     date: string;
//   //     start_cell: boolean;
//   //     end_cell: boolean;
//   //     cellLength: number;
//   // }
//   // create booking map key = `${date}-${bed.id}`

//   let currentRow: DormCalendar[] = [];
//   currentRow.push({
//     bed: dorm.beds[0],
//     date: '',
//     start_cell: false,
//     end_cell: false,

//     cellLength: 1,
//   });
// // generate array of array to store booking info
//   console.log('room is: ', dorm);
//   console.log('bookings: ', bookings);

// }
export function formatDorm(dorm: Room, bookings: DormBookingDetail[]) {
  const startDate = useBookingStore().pagination.start;
  const endDate = useBookingStore().pagination.end;
  const dateList = getBookingDateList(startDate, endDate);

  // Create a map for quick booking lookup: key = `${date}-${bed_id}`
  const bookingMap = new Map<string, DormBookingDetail>();

  bookings.forEach(booking => {
    const checkIn = new Date(booking.check_in_date);
    const checkOut = new Date(booking.checkout_date);

    // For each bed in the booking
    booking.beds.forEach(bed => {
      // For each date in the booking period
      let currentDate = new Date(checkIn);
      while (currentDate < checkOut) {
        const dateKey = currentDate.toISOString().split('T')[0];
        const mapKey = `${dateKey}-${bed.id}`;
        bookingMap.set(mapKey, booking);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
  });

  // Generate calendar grid: array of rows (one per bed)
  const calendar: DormCalendar[][] = [];

  dorm.beds.forEach(bed => {
    const bedRow: DormCalendar[] = [];

    // First column: bed header
    bedRow.push({
      date: '',
      start_cell: false,
      end_cell: false,
      cellLength: 1,
      bed: bed,
    });

    // Iterate through each date
    let i = 0;
    while (i < dateList.length) {
      const date = dateList[i];
      const mapKey = `${date}-${bed.id}`;
      const booking = bookingMap.get(mapKey);

      if (booking) {
        // Find the span of this booking
        let cellLength = 1;
        let j = i + 1;

        while (j < dateList.length) {
          const nextDate = dateList[j];
          const nextKey = `${nextDate}-${bed.id}`;
          const nextBooking = bookingMap.get(nextKey);

          // Check if it's the same booking
          if (nextBooking?.id === booking.id) {
            cellLength++;
            j++;
          } else {
            break;
          }
        }

        // Add the booking cell
        bedRow.push({
          bed: bed,
          bookingInfo: booking,
          date: date ?? 'n/a',
          start_cell: true,
          end_cell: j >= dateList.length || bookingMap.get(`${dateList[j]}-${bed.id}`)?.id !== booking.id,
          cellLength: cellLength,
        });

        i = j; // Skip the dates we've already processed
      } else {
        // Empty cell (no booking)
        bedRow.push({
          bed: bed,
          date: date ?? 'n/a',
          start_cell: false,
          end_cell: false,
          cellLength: 1,
        });

        i++;
      }
    }

    calendar.push(bedRow);
  });

  return calendar;
}