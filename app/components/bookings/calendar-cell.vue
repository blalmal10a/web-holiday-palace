<script setup lang="ts">
const props = defineProps({
    cell: {
        type: Object as () => CalendarData,
        required: true
    }
})

</script>
<template>
    <BookingsCalendarMenu
        v-if="cell.bookingInfo"
        :cell="cell"
    >
        <div class="p-4 border border-default ">
            <div class="-mr-10 ml-4">
                <div
                    class="rounded-lg px-2 whitespace-nowrap flex items-center h-8 relative cursor-pointer"
                    :class="{
                        'text-primary bg-elevated': !!cell.bookingInfo,
                    }"
                >
                    {{ cell.bookingInfo?.client?.name }}
                </div>
            </div>
        </div>
    </BookingsCalendarMenu>
    <div
        class="p-4 border border-default"
        v-if="!cell.bookingInfo"
    >
        <div class="rounded-lg px-2 whitespace-nowrap flex items-center h-8 relative cursor-pointer">
        </div>
    </div>
</template>
