import { addDays, differenceInDays, format, isBefore, isWithinInterval, max, min, toDate } from "date-fns";

export const useCalendarStore = defineStore('calendar', {
    state: () => ({
        openWebsiteCalendar: false,
        currentHoverCell: undefined as CalendarData | undefined,
        data: [
        ] as CalendarData[][],
        dateList: [] as string[],
        showBookingForm: false,
        selectedCells: [] as CalendarData[],
    }),
    actions: {
        // 
        async initCalendar(roomList: Room[], bookingList: Booking[]) {
            let websiteCalendarModal = this.openWebsiteCalendar;
            this.$reset();
            this.openWebsiteCalendar = websiteCalendarModal;
            let startDate = useBookingStore().pagination.start;
            let endDate = useBookingStore().pagination.end;
            this.dateList = getBookingDateList(startDate, endDate)
            let mappedBookings = mapBooking(bookingList)
            if (!roomList.length) {
                console.log('no roomlist length', roomList)
                await useRoom().fetchData();
                roomList = useRoom().data.value.data;
            }
            roomList.forEach(room => {
                let currentRow: CalendarData[] = []
                currentRow.push({
                    room: room,
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
        },
        addSelectedCell(cell: CalendarData) {
            this.selectedCells.push(cell)
            if (this.selectedCells.length == 2) {
                this.selectedCells.splice(0, 2);
            }
        },
        isCellSelected(cell: CalendarData) {
            return this.selectedCells.some(selectedCell => selectedCell.room.id === cell.room.id && selectedCell.date === cell.date)
        },
        isDateBetween(cell: CalendarData) {
            const selectedCell = this.selectedCells[0];
            if (!selectedCell) return false;

            if (cell.room.id !== selectedCell.room.id) return false;
            if (selectedCell?.room.id != this.currentHoverCell?.room.id) return false;

            const hoverCell = this.currentHoverCell;
            if (!hoverCell) return false;

            const currentDate = toDate(cell.date);
            const selectedDate = toDate(selectedCell.date);
            const hoverDate = toDate(hoverCell.date);

            const start = min([selectedDate, hoverDate]);
            const end = max([selectedDate, hoverDate]);

            return isWithinInterval(currentDate, { start, end });
        }
    }
});