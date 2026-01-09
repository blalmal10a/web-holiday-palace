<script setup lang="ts">
// 019ba356-e5fc-736a-bee3-8563b525d98b
const id = "019ba356-e5fc-736a-bee3-8563b525d98b";
const roomStore = useRoomStore()
const room = useRoom();
const booking = useBooking();
const bookingStore = useBookingStore();
const calendarStore = useCalendarStore();
await room.fetchData();
await booking.fetchData();
calendarStore.$reset();
calendarStore.initCalendar(roomStore.data.data, bookingStore.data.data)
function shouldRender(cellIndex: number, cell: CalendarData) {
    let shouldRender = true;

    if (cellIndex == 0) {
        shouldRender = false;
    }

    if (cell.bookingInfo && !(cell.start_cell)) {
        shouldRender = false;
    }

    return shouldRender;
}
</script>
<template>
    <div>
        <div class="w-full overflow-auto">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <template v-for="date in calendarStore.dateList">
                            <th class="text-left p-4">{{ date }}</th>
                        </template>
                    </tr>
                </thead>
                <template
                    v-for="(row, rowIndex) in calendarStore.data"
                    :key="rowIndex"
                >
                    <tr>
                        <template v-if="rowIndex == 0">

                        </template>
                        <template
                            v-for="(cell, cellIndex) in row"
                            :key="cellIndex"
                        >
                            <td v-if="cellIndex == 0">
                                <div class="p-4 whitespace-nowrap bg-default">
                                    {{ cell.room.name }}
                                </div>
                            </td>

                            <td
                                v-if="shouldRender(cellIndex, cell)"
                                :colspan="cell.cellLength"
                                @click="() => {
                                    console.log('click')
                                    if (cell.bookingInfo)
                                        bookingStore.setForm(cell.bookingInfo)
                                    calendarStore.showBookingForm = true;

                                }"
                            >
                                <div
                                    class="p-4 border border-default"
                                    style="height: 70px"
                                >
                                    <div
                                        v-if="cell.bookingInfo"
                                        class=" bg-blue-500 rounded-lg p-1 whitespace-nowrap h-full flex items-center"
                                        :class="{

                                        }"
                                    >
                                        {{ cell.bookingInfo?.client?.name }}
                                    </div>
                                </div>
                            </td>
                        </template>
                    </tr>
                </template>
            </table>
        </div>
        <BookingsFullScreenModal />
    </div>
</template>
<style>
table,
th,
td {
    /* border: 1px solid; */
}

table {
    border-collapse: collapse;
}

th:first-child,
td:first-child {
    position: sticky;
    left: 0;
    z-index: 10;
    /* Keeps it above other cells during scroll */
    /* Required to prevent transparency */
}
</style>