<script lang="ts" setup>
	const props = defineProps({
		isModal: {
			type: Boolean,
			default: false,
		},
	})
	const store = useBookingStore()
	const model = useBooking()

	const user = useUser()
	const userStore = useUserStore()

	const room = useRoom()
	const roomStore = useRoomStore()
	roomStore.pagination.pageSize = Number.MAX_SAFE_INTEGER
	const openSearchClient = ref(false)
	const openSearchPhone = ref(false)
	const newClient = ref(false)
	const currentClient = ref<User>()
	const imageFiles = ref<File[]>([])
	onMounted(async () => {
		if (!store.form.date_list) {
			store.form.date_list = []
		}
		if (!props.isModal && !store.form.id && useRoute().params.id != "add") {
			await model.fetchDetail()
		}
		store.form.date_list = getBookingDateList(
			store.form.check_in_date,
			store.form.checkout_date,
		)
	})
	userStore.pagination.exclude_admin = true
	await user.fetchData()
	await room.fetchData()
	if (props.isModal) {
		populateStaff(store.form.room_id)
	}
	function populateStaff($event: string) {
		const room = roomStore.data.data.find((room: Room) => room.id === $event)
		if (room) {
			store.form.staff_id = room.staff_id
		}
	}
	function handleClientUpdate($event: string) {
		currentClient.value = userStore.data.data.find(
			(user: User) => user.id === $event,
		)
		if (!store.form.new_client_name) return

		if (currentClient.value) {
			store.form.new_client_name = undefined
			store.form.new_client_phone = undefined

			newClient.value = false
		} else {
			// store.form.new_client_phone =
		}
	}
	const onCreateNewClient = ($event: string) => {
		store.form.client_id = $event
		store.form.new_client_name = $event
		openSearchClient.value = false
		newClient.value = true
	}
	onBeforeUnmount(() => {
		userStore.pagination.exclude_clients = false
		store.$reset()
	})
</script>
<template>
	<div class="flex flex-col items-center">
		<u-card style="min-width: min(400px, 90vw)">
			<u-form
				:schema="bookingFormSchema(newClient)"
				:state="store.form"
				@submit="model.submitForm(imageFiles)"
				class="space-y-4 w-full"
				@error="($event) => console.log($event)"
			>
				<u-form-field
					label="Client"
					name="client_id"
					:hint="currentClient ? `Phone: ${currentClient.phone}` : ''"
					:error="currentClient?.is_blacklisted ? `Client is blacklisted` : ``"
				>
					<USelectMenu
						:filter-fields="['name', 'phone']"
						default-open
						v-model:open="openSearchClient"
						class="w-full"
						v-model="store.form.client_id"
						value-key="id"
						label-key="name"
						description-key="phone"
						@update:model-value="handleClientUpdate"
						create-item
						@create="onCreateNewClient"
						:items="userStore.data.data"
					/>
				</u-form-field>
				<u-form-field label="Phone" name="new_client_phone" v-if="newClient">
					<u-input
						:disabled="!newClient"
						v-model="store.form.new_client_phone"
						icon="i-lucide-phone"
					/>
				</u-form-field>
				<u-form-field label="Room" name="room_id">
					<USelectMenu
						class="w-full"
						v-model="store.form.room_id"
						@update:model-value="populateStaff"
						value-key="id"
						label-key="name"
						:items="roomStore.data.data"
					/>
				</u-form-field>

				<u-form-field label="No. of adults" name="no_of_adults">
					<u-input
						v-model="store.form.no_of_adults"
						icon="i-lucide-indian-rupee"
						type="number"
					/>
				</u-form-field>
				<u-form-field label="no. of children" name="no_of_children">
					<u-input
						v-model="store.form.no_of_children"
						icon="i-lucide-indian-rupee"
						type="number"
					/>
				</u-form-field>
				<u-form-field label="Check in date" name="check_in_date">
					<u-input
						v-model="store.form.check_in_date"
						icon="i-lucide-layers"
						type="date"
					/>
				</u-form-field>
				<u-form-field label="Check out date" name="checkout_date">
					<u-input
						v-model="store.form.checkout_date"
						icon="i-lucide-layers"
						type="date"
					/>
				</u-form-field>
				<u-form-field label="Deposit amount" name="deposit">
					<u-input
						v-model="store.form.deposit"
						icon="i-lucide-indian-rupee"
						type="number"
					/>
				</u-form-field>

				<div class="flex justify-end space-x-2">
					<u-button
						size="lg"
						variant="outline"
						color="neutral"
						class="h-full"
						:disabled="store.loadingSubmitBookingForm"
						@click="
							() => {
								if (useRoute().name == 'hotels-bookings-id-form') {
									useRouter().push({
										name: 'hotels-bookings',
									})
								} else {
									useRouter().push({
										name: 'hotels-calendar',
									})
								}
							}
						"
					>
						Cancel
					</u-button>
					<u-button
						size="lg"
						:loading="store.loadingSubmitBookingForm"
						class=""
						type="submit"
					>
						Submit
					</u-button>
				</div>
			</u-form>
		</u-card>
	</div>
</template>

<style scoped>
	.relative.inline-flex.items-center {
		width: 100%;
	}
</style>
