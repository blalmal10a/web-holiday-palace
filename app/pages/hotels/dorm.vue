<script setup lang="ts">
import { addDays, format } from 'date-fns'

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
					<th class="text-center p-4 border-default border text-sm whitespace-nowrap">
						HP
					</th>
					<th
						v-for="(date, index) in store.dateList"
						:key="index"
						class="text-center p-4 border-default border text-sm whitespace-nowrap"
					>
						{{ format(date, "do MMM") }}
						<div>({{ format(date, "EEE") }})</div>
					</th>
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

							<td v-if="index == 0">
								<div
									class="p-4 border border-default"
									v-if="!cell.bookingInfo"
								>
									<div
										class="rounded-lg px-2 whitespace-nowrap flex items-center h-8 relative cursor-pointer">
										{{ cell.bed.number }}
									</div>
								</div>

							</td>

							<td
								:colspan="cell.cellLength"
								v-if="index != 0"
								@click="
									() => {
										if (!cell.bookingInfo) {
											if (cell.bookingInfo) {
												bookingStore.setForm(cell.bookingInfo)
											} else {
												if (cell.bed.room_id) {
													bookingStore.form.room_id = cell.bed.room_id;
												}
												bookingStore.form.check_in_date = cell.date
												bookingStore.form.checkout_date = format(
													addDays(cell.date, 1),
													'yyyy-MM-dd',
												)
											}
											useRouter().push({
												name: 'hotels-dorm',
												query: {
													booking: 1,
												}
											})
										}
									}
								"
							>
								<template v-if="cell.bookingInfo">
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
								</template>

								<div
									class="p-4 border border-default"
									v-if="!cell.bookingInfo"
								>
									<div
										class="rounded-lg px-2 whitespace-nowrap flex items-center h-8 relative cursor-pointer">
									</div>
								</div>
							</td>
						</template>
					</tr>
				</template>
			</tbody>
		</table>
		<BookingsFullScreenModal />
	</div>
</template>
<style scoped>
table {
	border-collapse: collapse;
}

th:first-child,
td:first-child {
	position: sticky;
	left: 0;
	z-index: 10;
}
</style>