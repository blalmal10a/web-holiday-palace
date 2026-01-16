<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { format } from 'date-fns';

const df = new DateFormatter('en-IN', {
    dateStyle: 'medium'
})

const modelValue = shallowRef({
    start: new CalendarDate(2022, 1, 20),
    end: new CalendarDate(2022, 2, 10)
})
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
    <UPopover>

        <UButton
            color="neutral"
            variant="subtle"
            icon="i-lucide-calendar"
        >
            <template v-if="true">
                <template v-if="bookingStore.pagination.start && bookingStore.pagination.end">
                    {{ df.format(new Date(bookingStore.pagination.start)) }} - {{
                        df.format(new Date(bookingStore.pagination.end)) }}
                </template>

                <template v-else>
                    {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }}
                </template>
            </template>
            <template v-else>
                Pick a date
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
                }"
            />
        </template>
    </UPopover>
</template>
