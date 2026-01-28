<script setup lang="ts">
definePageMeta({
	layout: "main-layout",
	pageTitle: "Dorm",
})

const booking = useBooking()
const bookingStore = useBookingStore()
const room = useRoom()
const roomStore = useRoomStore()
bookingStore.pagination.is_dormatory = true
roomStore.pagination.is_dormatory = true
const store = useCalendarStore();
await room.fetchData()
await booking.fetchData()
if (roomStore.data.data?.[0]) {
	let selectedDorm = roomStore.data.data[0];
	if (selectedDorm.is_dormatory) {
		store.dorm = formatDorm(selectedDorm, bookingStore.data.data as DormBookingDetail[]);
	}
}
</script>
<template>
	<div class="">
		<pre>
			{{ store.dorm }}
		</pre>
	</div>
</template>
