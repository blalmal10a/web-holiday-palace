import { addDays, differenceInDays, format, isBefore, isWithinInterval, max, min, toDate } from "date-fns";

export const useCalendarStore = defineStore('calendar', {
    state: () => ({
        showWebsiteCalendar: false,
        showBookingSummary: false,
        showClientNameField: false,
        enableClientCalendar: false,
        currentHoverCell: undefined as CalendarData | undefined,
        data: [
        ] as CalendarData[][],
        dateList: [] as string[],
        showBookingForm: false,
        selectedCells: [] as CalendarData[],
        clientData: {
        } as UserForm,
        dorm: {} as DormCalendar[][],
    }),
    actions: {
        // 
        async initCalendar(roomList: Room[], bookingList: Booking[]) {
            let websiteCalendarModal = this.showWebsiteCalendar;
            this.$reset();
            this.showWebsiteCalendar = websiteCalendarModal;
            const bookingStore = useBookingStore();
            if (!bookingStore.pagination.start || !bookingStore.pagination.end) {
                bookingStore.pagination.start = format(new Date(), 'yyyy-MM-dd');
                bookingStore.pagination.end = format(addDays(new Date(), 2), 'yyyy-MM-dd');
            }
            let startDate = bookingStore.pagination.start;
            let endDate = bookingStore.pagination.end;

            this.dateList = getBookingDateList(startDate, endDate)
            let mappedBookings = mapBooking(bookingList)
            if (!roomList.length) {
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
                    let cellEndDate = mappedBookings[key]?.checkout_date
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
                        end_cell: currentDate == cellEndDate,
                        cellLength,
                    });
                    if (currentDate == cellEndDate && mappedBookings[key]) {
                        //extra cell without bookingInfo for end cell, because we dont render the checkout date
                        currentRow.push({
                            room: room,
                            date: currentDate,
                            start_cell: false,
                            end_cell: false,
                            cellLength: 1,
                        });
                    }
                });
                this.data.push(currentRow)
            })
        },
        addSelectedCell(cell: CalendarData) {
            if (this.selectedCells[0]) {
                if (this.selectedCells[0].room.id != cell.room.id) {
                    this.selectedCells = []
                }
            }
            this.selectedCells.push(cell)

            if (this.selectedCells.length == 2) {
                // if they are not in the same cell
                this.showBookingSummary = true;
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
        },
        isBetweenSelectedDates(cell: CalendarData) {
            const selectedCell1 = this.selectedCells[0];
            const selectedCell2 = this.selectedCells[1];
            const targetDate = cell.date;
            // check if target date is between two selected cells
            if (!selectedCell1 || !selectedCell2) return false;
            if (cell.room.id != selectedCell1.room.id) return false;
            return isWithinInterval(targetDate, {
                start: min([toDate(selectedCell1.date), toDate(selectedCell2.date)]),
                end: max([toDate(selectedCell1.date), toDate(selectedCell2.date)]),
            })

        }
    }
});