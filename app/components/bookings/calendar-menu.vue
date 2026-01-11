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
            useRouter().push({
                hash: '#booking',
            })
        }
    },
    {
        label: 'Invoice',
        icon: 'i-lucide-receipt-text',
        disabled: !props.cell.bookingInfo?.invoice?.id,
        onClick: () => {
            if (!props.cell.bookingInfo?.invoice?.id) {
                useToast().add({
                    title: 'Invoice not found',
                    description: 'Invoice not found',
                    color: 'error',
                })
                return;
            }
            useInvoiceStore().form = props.cell.bookingInfo?.invoice;
            useRouter().push({
                name: 'hotels-calendar',
                hash: '#invoice'
            })
        }
    },
    // {
    //     label: 'Payments',
    //     icon: 'i-lucide-hand-coins',
    //     disabled: !props.cell.bookingInfo?.invoice?.id,
    // },
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

// watch router hash
watch(() => useRoute().hash, () => {
    if (useRoute().hash == '#invoice') {
        useInvoiceStore().showInvoiceFormModal = true;
    }
    if (!useRoute().hash) {
        useInvoiceStore().showInvoiceFormModal = false;
    }
})
watch(() => useRoute().hash, () => {
    if (useRoute().hash == '#booking') {
        calendarStore.showBookingForm = true;
    }
    if (!useRoute().hash) {
        calendarStore.showBookingForm = false;
    }
})
watch(() => calendarStore.showBookingForm, (current, old) => {
    if (!current) {
        useRouter().push({
            name: 'hotels-calendar'
        })
    }

})
watch(() => useInvoiceStore().showInvoiceFormModal, (current, old) => {
    if (!current) {
        useRouter().push({
            name: 'hotels-calendar'
        })
    }

})
onMounted(() => {
    if (useRoute().hash) {
        useRouter().push({
            name: 'hotels-calendar'
        })
    }
})
</script>

<template>
    <UDropdownMenu
        :items="items"
        :ui="{ content: 'w-48' }"
    >
        <slot />
    </UDropdownMenu>
</template>
