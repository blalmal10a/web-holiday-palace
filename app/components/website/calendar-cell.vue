<script setup lang="ts">


const props = defineProps({
    cell: {
        type: Object as () => CalendarData,
        required: true
    }
})
</script>
<template>
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
        class="py-1 border border-default"
        v-if="!cell.bookingInfo"
        @click="useCalendarStore().addSelectedCell(cell)"
    >
        <div
            class="px-1"
            :class="{
                'bg-elevated': useCalendarStore().isDateBetween(cell),
                'bg-accented':
                    useCalendarStore().isBetweenSelectedDates(cell),
            }"
        >
            <div
                class="p-3 rounded-xl"
                :class="{
                    'bg-elevated outline-2 outline-primary':
                        useCalendarStore().isCellSelected(cell),
                    'hover:bg-elevated hover:outline-1 hover:outline-primary':
                        !useCalendarStore().isCellSelected(cell),
                }"
            >
                <div class="rounded-lg px-2 whitespace-nowrap flex items-center h-8 relative cursor-pointer">

                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.alloted-rooms {
    background: #fb4f3f;
    background: radial-gradient(circle,
            rgba(251, 79, 63, 1) 0%,
            rgba(252, 70, 107, 1) 100%);
}
</style>