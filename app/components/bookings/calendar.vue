<script setup lang="ts">
import { addDays, format } from "date-fns"

const roomStore = useRoomStore()
const room = useRoom()
const booking = useBooking()
const bookingStore = useBookingStore()
const calendarStore = useCalendarStore()
await room.fetchData()
await booking.fetchData()
calendarStore.$reset()
calendarStore.initCalendar(roomStore.data.data, bookingStore.data.data)
function shouldRender(cellIndex: number, cell: CalendarData) {
	let shouldRender = false

	if (cell.bookingInfo && cell.start_cell) {
		shouldRender = true
	}
	if (!cell.bookingInfo) {
		shouldRender = true
	}
	if (cellIndex == 0) {
		shouldRender = false
	}
	return shouldRender
}

watch(
	() => useRoute().hash,
	() => {
		if (useRoute().hash == "#invoice") {
			useInvoiceStore().showInvoiceFormModal = true
		}
		if (!useRoute().hash) {
			useInvoiceStore().showInvoiceFormModal = false
		}
	},
)
watch(
	() => useRoute().hash,
	() => {
		if (useRoute().hash == "#booking") {
			calendarStore.showBookingForm = true
		}
		if (!useRoute().hash) {
			calendarStore.showBookingForm = false
		}
	},
)
watch(
	() => calendarStore.showBookingForm,
	(current, old) => {
		if (!current) {
			useRouter().push({
				name: "hotels-calendar",
			})
		}
	},
)
watch(
	() => useInvoiceStore().showInvoiceFormModal,
	(current, old) => {
		if (!current) {
			useRouter().push({
				name: "hotels-calendar",
			})
		}
	},
)
onMounted(() => {
	const route = useRoute();
	if (typeof route.query.start_date === 'string' && typeof route.query.end_date === 'string' && typeof route.query.room_id === 'string') {

		// if (props.cell.bookingInfo) {
		// 	bookingStore.setForm({ ...props.cell.bookingInfo })
		// } else {
		// 	bookingStore.form.room_id = props.cell.room.id
		// 	bookingStore.form.check_in_date = props.cell.date
		// 	bookingStore.form.checkout_date = format(
		// 		addDays(props.cell.date, 1),
		// 		"yyyy-MM-dd",
		// 	)
		// }

		bookingStore.form.room_id = route.query.room_id
		bookingStore.form.check_in_date = route.query.start_date
		bookingStore.form.checkout_date = route.query.end_date
		calendarStore.showBookingForm = true;
		if (route.query.client_id) {
			bookingStore.form.client_id = route.query.client_id as string;
		} else {
			bookingStore.form.client_id = route.query.client_name as string;;
			bookingStore.form.new_client_name = route.query.client_name as string;;
			bookingStore.form.new_client_phone = route.query.client_phone as string;;
		}
		console.log('here')
		useRouter().push({
			hash: "#booking",
			query: {
				...route.query,
			}
		})
	} else {
		useRouter().push({
			name: "hotels-calendar",
		})
		console.log('else')
	}
})
</script>
<template>
	<div
		id="booking"
		class="container m-auto"
	>
		<div
			id="invoice"
			class="w-full overflow-auto pt-4"
		>
			<table>
				<thead>
					<tr>
						<th class="bg-default">
							<div class="h-24 flex items-center justify-center border border-default">
								HP
							</div>
						</th>
						<template v-for="date in calendarStore.dateList">
							<th class="text-center p-4 border-default border text-sm whitespace-nowrap">
								{{ format(date, "Do MMM") }}
								<div>({{ format(date, "EEE") }})</div>
							</th>
						</template>
					</tr>
				</thead>
				<template
					v-for="(row, rowIndex) in calendarStore.data"
					:key="rowIndex"
				>
					<tr>
						<template
							v-for="(cell, cellIndex) in row"
							:key="cellIndex"
						>
							<td
								v-if="cellIndex == 0"
								class="bg-default"
							>
								<div class="py-4 px-1 border border-default">
									<div
										class="py-4 px-1 h-8 text-xs flex items-center max-w-24"
										style="text-overflow: ellipsis"
									>
										<div class="w-full truncate">
											{{ cell.room.name }}
										</div>
										<span
											class="pointer-events-none absolute -top-8 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-black text-white p-1 rounded"
										>
											{{ cell.room.name }}
										</span>
									</div>
								</div>
							</td>

							<td
								v-if="shouldRender(cellIndex, cell)"
								:colspan="cell.cellLength"
								@click="
									() => {
										if (!cell.bookingInfo) {
											if (cell.bookingInfo) {
												bookingStore.setForm(cell.bookingInfo)
											} else {
												bookingStore.form.room_id = cell.room.id
												bookingStore.form.check_in_date = cell.date
												bookingStore.form.checkout_date = format(
													addDays(cell.date, 1),
													'yyyy-MM-dd',
												)
											}
											useRouter().push({
												name: 'hotels-calendar',
												hash: '#booking',
											})
										}
									}
								"
							>
								<BookingsCalendarMenu
									v-if="cell.bookingInfo"
									:cell="cell"
								>
									<div class="p-4 border border-default">
										<div
											class="rounded-lg px-2 whitespace-nowrap flex items-center h-8 relative cursor-pointer"
											:class="{
												'text-primary bg-elevated': !!cell.bookingInfo,
											}"
										>
											{{ cell.bookingInfo?.client?.name }}
										</div>
									</div>
								</BookingsCalendarMenu>
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
			</table>
		</div>
		<BookingsFullScreenModal />
		<InvoicesFullScreenModal />
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
