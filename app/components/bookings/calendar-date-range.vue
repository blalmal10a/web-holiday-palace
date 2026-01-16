<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { format } from 'date-fns';

const df = new DateFormatter('en-IN', {
    dateStyle: 'medium'
})

const openCalendar = ref(false)
const booking = useBooking();
const bookingStore = useBookingStore();
function updateCalendar() {
    nextTick(
        async () => {
            await booking.fetchData();
            useCalendarStore().initCalendar(useRoomStore().data.data, bookingStore.data.data)
        }
    )
}
</script>

<template>
    <UPopover v-model:open="openCalendar">

        <UButton
            color="neutral"
            variant="subtle"
            icon="i-lucide-calendar"
        >
            <template v-if="bookingStore.pagination.start && bookingStore.pagination.end">
                {{ df.format(new Date(bookingStore.pagination.start)) }} - {{
                    df.format(new Date(bookingStore.pagination.end)) }}
            </template>
        </UButton>

        <template #content>

            <UCalendar
                :maximum-days="32"
                size="xs"
                v-model:start-value="bookingStore.pagination.start"
                v-model:end-value="bookingStore.pagination.end"
                class="p-2"
                :number-of-months="1"
                range
                @update:valid-model-value="($event) => {

                    if ($event.start)
                        bookingStore.pagination.start = $event.start?.toString();

                    if ($event.end)
                        bookingStore.pagination.end = $event.end?.toString();

                    $nextTick(() => updateCalendar())
                    openCalendar = false;
                }"
            />
        </template>
    </UPopover>
</template>
