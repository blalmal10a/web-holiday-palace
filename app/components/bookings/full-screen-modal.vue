    <script setup lang="ts">
    import BookingForm from '../forms/booking-form.vue';

    const calendarStore = useCalendarStore();
    const modalOpen = computed(
        () => {
            return !!useRoute().query.booking;
        }
    )
</script>
    <template>
        <UModal
            v-model:open="modalOpen"
            fullscreen
            @close:prevent="() => {
                console.log('triger close')
            }"
        >

            <template #content>
                <div class="flex items-center gap-1.5 p-4 sm:px-6 min-h-16">
                    <div class="">
                        <h2
                            id="reka-dialog-title-v-0-13-14"
                            class="text-highlighted font-semibold"
                        >Booking Form</h2><!--v-if-->
                    </div>
                </div>
                <div class="flex-1 overflow-y-auto p-4 sm:p-6">
                    <BookingForm is-modal />
                </div>

            </template>
        </UModal>
    </template>