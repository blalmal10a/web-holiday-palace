<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { addDays, format } from 'date-fns';
const props = defineProps({
    cell: {
        default: {} as CalendarData,
        required: true
    }
})
const bookingStore = useBookingStore();
const calendarStore = useCalendarStore();
const items: DropdownMenuItem[] = [
    {
        label: 'Booking',
        icon: 'i-lucide-calendar',
        onClick: () => {
            if (props.cell.bookingInfo) {
                bookingStore.setForm(props.cell.bookingInfo)
            } else {
                bookingStore.form.room_id = props.cell.room.id;
                bookingStore.form.check_in_date = props.cell.date;
                bookingStore.form.checkout_date = format(addDays(props.cell.date, 1), 'yyyy-MM-dd');
            }
            calendarStore.showBookingForm = true;
        }
    },
    {
        label: 'Invoice',
        icon: 'i-lucide-receipt-text',
        onClick: () => {
            useRouter().push({
                name: 'hotels-invoices-id',
                params: {
                    id: props.cell.bookingInfo?.id
                }
            })
        }
    },
    {
        label: 'Payments',
        icon: 'i-lucide-hand-coins'
    },
    {
        label: 'Print invoice',
        icon: 'i-lucide-printer',
        onClick: () => {
            useRouter().push({
                name: 'hotels-invoices-id',
                params: {
                    id: props.cell.bookingInfo?.id
                }
            })
        }
    },
]
</script>

<template>
    <UDropdownMenu
        :items="items"
        :ui="{ content: 'w-48' }"
    >
        <slot />
    </UDropdownMenu>
</template>
