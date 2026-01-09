<script setup lang="ts">
import { addDays, format } from 'date-fns';

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
        <div class="w-full overflow-auto pt-4">
            <table>
                <thead>
                    <tr>
                        <th class=" bg-default ">
                            <div class=" h-24 flex items-center justify-center border border-default">
                                HP
                            </div>
                            <!-- <div>Days
                                <UIcon name="i-lucide-arrow-right"></UIcon>
                            </div>
                            <USeparator />
                            <div>Room <UIcon name="i-lucide-arrow-down"></UIcon>
                            </div> -->
                        </th>
                        <template v-for="date in calendarStore.dateList">
                            <th class="text-left p-4 border-default border text-sm">
                                {{ format(date, 'Do MMM') }}
                                <div class="text-center">
                                    ({{ format(date, 'EEE') }})
                                </div>
                            </th>
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
                            <td
                                v-if="cellIndex == 0"
                                class="bg-default"
                            >
                                <div class="p-4 border border-default">
                                    <div class="p-4 whitespace-nowrap  h-16">
                                        {{ cell.room.name }}
                                    </div>
                                </div>
                            </td>

                            <td
                                v-if="shouldRender(cellIndex, cell)"
                                :colspan="cell.cellLength"
                                @click="() => {
                                    if (cell.bookingInfo) {
                                        bookingStore.setForm(cell.bookingInfo)
                                    } else {
                                        bookingStore.form.room_id = cell.room.id;
                                        bookingStore.form.check_in_date = cell.date;
                                        bookingStore.form.checkout_date = format(addDays(cell.date, 1), 'yyyy-MM-dd');
                                    }
                                    calendarStore.showBookingForm = true;

                                }"
                            >
                                <div class="p-4 border border-default">
                                    <div
                                        class="  rounded-lg p-1 whitespace-nowrap  flex items-center h-16"
                                        :class="{
                                            'bg-blue-500': !!cell.bookingInfo
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
<style scoped>
table {
    border-collapse: collapse;
}

th:first-child,
td:first-child {
    position: sticky;
    left: 0;
    z-index: 10;
}
</style>