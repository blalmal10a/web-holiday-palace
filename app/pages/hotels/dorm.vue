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
onBeforeUnmount(
	async () => {
		await nextTick();
	}
)
</script>
<template>
	<div class="">
		<table>
			<thead>
				<tr>
					<!--  -->
				</tr>
			</thead>
			<tbody>
				<template
					v-for="(row, rowIndex) in store.dorm"
					:key="rowIndex"
				>
					<tr>
						<template
							v-for="(cell, index) in row"
							:key="index"
						>
							<template v-if="index == 1">
								{{ cell.bed.number }}
							</template>
							<td v-if="index != 0">
								<div class="h-8 min-w-24 overflow-hidden whitespace-nowrap">
									{{ rowIndex }} {{ index }} {{ cell.bookingInfo?.client.name }}
								</div>
							</td>
						</template>
					</tr>
				</template>
			</tbody>
		</table>
		<pre>
	{{ store.dorm }}
</pre>
	</div>
</template>
