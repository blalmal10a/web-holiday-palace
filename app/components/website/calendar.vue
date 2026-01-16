<script setup lang="ts">
import { addDays, format } from "date-fns"

const roomStore = useRoomStore()
const room = useRoom()
const booking = useBooking()
const bookingStore = useBookingStore()
const calendarStore = useCalendarStore()
await room.fetchData()
await booking.fetchData()
calendarStore.initCalendar(roomStore.data.data, bookingStore.data.data)
function shouldRender(cellIndex: number, cell: CalendarData) {
    let shouldRender = false
    if (cell.bookingInfo && cell.start_cell) {
        shouldRender = true
    }
    if (!cell.bookingInfo) {
        shouldRender = true
    }
    if (cellIndex == 0) {
        shouldRender = false
    }
    return shouldRender
}

</script>
<template>
    <div
        id="booking"
        class="container mx-auto"
    >
        <div class="p-3">
            <BookingsCalendarDateRange />
        </div>
        <div
            id="invoice"
            class="w-full overflow-auto pt-4"
        >
            <table>
                <thead>
                    <tr>
                        <th class="bg-default">
                            <div class="h-24 flex items-center justify-center border border-default">
                                HP
                            </div>
                        </th>
                        <template v-for="date in calendarStore.dateList">
                            <th class="text-center p-4 border-default border text-sm whitespace-nowrap">
                                {{ format(date, "Do MMM") }}
                                <div>({{ format(date, "EEE") }})</div>
                            </th>
                        </template>
                    </tr>
                </thead>
                <template
                    v-for="(row, rowIndex) in calendarStore.data"
                    :key="rowIndex"
                >
                    <tr>
                        <template
                            v-for="(cell, cellIndex) in row"
                            :key="cellIndex"
                        >
                            <td
                                v-if="cellIndex == 0"
                                class="bg-default"
                            >
                                <div class="py-4 px-1 border border-default">
                                    <div
                                        class="py-4 px-1 h-8 text-xs flex items-center max-w-24"
                                        style="text-overflow: ellipsis"
                                    >
                                        <div class="w-full truncate">
                                            {{ cell.room.name }}
                                        </div>
                                        <span
                                            class="pointer-events-none absolute -top-8 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-black text-white p-1 rounded"
                                        >
                                            {{ cell.room.name }}
                                        </span>
                                    </div>
                                </div>
                            </td>

                            <td
                                v-if="shouldRender(cellIndex, cell)"
                                :colspan="cell.cellLength"
                                @mouseover="() => {
                                    calendarStore.currentHoverCell = cell;
                                }"
                                @mouseleave="() => {
                                    calendarStore.currentHoverCell = undefined;
                                }"
                            >

                                <div
                                    v-if="cell.bookingInfo"
                                    class="p-4 border border-default"
                                >
                                    <div
                                        class="rounded-lg px-2 whitespace-nowrap flex items-center h-8 relative cursor-pointer"
                                        :class="{
                                            'alloted-rooms text-xs': !!cell.bookingInfo,
                                        }"
                                    >
                                        Reserved
                                    </div>
                                </div>
                                <div
                                    class="py-1 border border-default "
                                    v-if="!cell.bookingInfo"
                                    @click="useCalendarStore().addSelectedCell(cell)"
                                >
                                    <div
                                        class="px-1"
                                        :class="{
                                            'bg-elevated': useCalendarStore().isDateBetween(cell),
                                            'bg-accented': useCalendarStore().isBetweenSelectedDates(cell),

                                        }"
                                    >
                                        <div
                                            class="p-3 rounded-xl "
                                            :class="{
                                                'bg-elevated outline-2 outline-primary': useCalendarStore().isCellSelected(cell),
                                                'hover:bg-elevated hover:outline-1 hover:outline-primary': !useCalendarStore().isCellSelected(cell),
                                            }"
                                        >
                                            <div
                                                class="rounded-lg px-2 whitespace-nowrap flex items-center h-8 relative cursor-pointer ">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </template>
                    </tr>
                </template>
            </table>
        </div>
    </div>
    <WebsiteBookingSummary />
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

.alloted-rooms {
    background: #fb4f3f;
    background: radial-gradient(circle, rgba(251, 79, 63, 1) 0%, rgba(252, 70, 107, 1) 100%);
}
</style>
