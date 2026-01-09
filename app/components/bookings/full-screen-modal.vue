    <script setup lang="ts">
    import BookingForm from '../forms/booking-form.vue';

    const calendarStore = useCalendarStore();
</script>
    <template>
        <UModal
            v-model:open="calendarStore.showBookingForm"
            fullscreen
        >
            <template #title>Booking Form</template>
            <template #body>
                <BookingForm is-modal />
            </template>
            <!-- <template #title>title of modal</template>
<template #content>
                <div aria-describedby="nothing">
                    modal
                </div>
            </template> -->
        </UModal>
    </template>