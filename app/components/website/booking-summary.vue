<script setup lang="ts">
import { format } from 'date-fns';
import BookingStepper from './booking-stepper.vue';

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


</script>
<template>
    <UModal
        v-model:open="calendarStore.showBookingSummary"
        @after:leave="calendarStore.selectedCells.splice(0, 2)"
    >
        <template #title>
            Booking
        </template>
        <template #body>
            <BookingStepper />

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