import { addDays, differenceInDays, format, isBefore } from "date-fns";

export const useCalendarStore = defineStore('calendar', {
    state: () => ({
        data: [
        ] as CalendarData[][],
        dateList: [] as string[],
        showBookingForm: false,
    }),
    actions: {
        // 
        initCalendar(roomList: Room[], bookingList: Booking[]) {
            let startDate = format(new Date(), 'yyyy-MM-dd')
            let endDate = format(addDays(startDate, 7), 'yyyy-MM-dd');
            this.dateList = getBookingDateList(startDate, endDate)
            let mappedBookings = mapBooking(bookingList)

            roomList.forEach(room => {
                let currentRow = []
                currentRow.push({
                    room: room,
                    bookingInfo: null,
                    date: '',
                    start_cell: false,
                    end_cell: false,
                    cellLength: 1,
                })
                this.dateList.forEach((currentDate, index) => {
                    let key = `${room.id}-${currentDate}`
                    let cellLength = 1;

                    let cellStartDate = mappedBookings[key]?.check_in_date
                    if (mappedBookings[key]) {
                        cellStartDate = mappedBookings[key]?.check_in_date
                        cellStartDate = isBefore(cellStartDate, startDate) ? startDate : cellStartDate
                        cellLength = differenceInDays(mappedBookings[key]!.checkout_date, cellStartDate) + 1;
                        if (cellLength > this.dateList.length) {
                            cellLength = this.dateList.length;
                        }
                    }

                    currentRow.push({
                        room: room,
                        bookingInfo: mappedBookings[key],
                        date: currentDate,
                        start_cell: currentDate == cellStartDate,
                        end_cell: index === cellLength,
                        cellLength,
                    });
                });
                this.data.push(currentRow)
                // 
            })
        }
    }
});