<script setup lang="ts">
import { format } from 'date-fns';

const calendarStore = useCalendarStore();
const totalCost = computed(
    () => {
        if (!calendarStore.selectedCells[0] || !calendarStore.selectedCells[1]) {
            return 0;
        }
        const checkInDate = calendarStore.selectedCells[0].date;
        const checkOutDate = calendarStore.selectedCells[1].date;
        const dateList = getBookingDateList(checkInDate, checkOutDate)
        let totalCost = 0;
        totalCost = calendarStore.selectedCells[1].room.rate * dateList.length;
        return totalCost;
    }
)
const message = computed(() => {
    const startCell = calendarStore.selectedCells[0]!
    const endCell = calendarStore.selectedCells[1]!

    let msg = `Hello, i would like to make booking

    Room: ${startCell.room.name}\n
    Check in: ${format(startCell.date, 'Do MMM, yyyy')}\n
    Check out: ${format(endCell.date, 'Do MMM, yyyy')}\n

    url: \`${window.location.origin}/hotels/calendars?#booking?start_date=${startCell.date}&end_date=${endCell.date}&room_id=${startCell.room.id}\`
    `
    return msg;
})

</script>
<template>
    <UModal
        v-model:open="calendarStore.showBookingSummary"
        @after:leave="calendarStore.selectedCells.splice(0, 2)"
    >
        <template #title>
            Booking summary
        </template>
        <template #body>
            <table>
                <tr v-if="calendarStore.selectedCells[0]">
                    <td>Room</td>
                    <td>{{ calendarStore.selectedCells[0].room.name }}</td>
                </tr>
                <tr v-if="calendarStore.selectedCells[0]">
                    <td>Check in</td>
                    <td>{{ format(calendarStore.selectedCells[0].date, 'Do MMM, yyyy') }}</td>
                </tr>
                <tr v-if="calendarStore.selectedCells[1]">
                    <td>Check out</td>
                    <td>{{ format(calendarStore.selectedCells[1].date, 'Do MMM, yyyy') }}</td>
                </tr>
                <tr v-if="calendarStore.selectedCells[0] && calendarStore.selectedCells[1]">
                    <td>Expected cost</td>
                    <td>
                        {{ toRupees(totalCost) }}
                    </td>
                </tr>
            </table>
        </template>
        <template #footer>
            <div class="w-full flex justify-end space-x-2">
                <UButton
                    color="neutral"
                    variant="soft"
                    @click="useCalendarStore().showBookingSummary = false"
                >
                    Cancel
                </UButton>
                <UButton
                    color="primary"
                    variant="soft"
                    @click="openWhatsapp(message, '9774888724')"
                >
                    Make whatsapp booking
                </UButton>
            </div>
        </template>
    </UModal>
</template>
<style scoped>
table {
    text-align: left;
    border-collapse: collapse;
    border: 1px solid #ccc;
    width: 100%;
}

th {
    border: 1px solid #ccc;
    padding: 0.5rem;
}

td {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 0.5rem;
}
</style>