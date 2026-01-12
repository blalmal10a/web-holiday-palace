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
	const openClientSelectMenu = ref(false)
	const newClient = ref(false)
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
		if (!store.form.new_client_name) return
		const user = userStore.data.data.find((user: User) => user.id === $event)
		if (user) {
			store.form.new_client_name = undefined
		}
	}
	const onCreateNewClient = ($event: string) => {
		store.form.client_id = $event
		store.form.new_client_name = $event
		store.form.new_client_email = `${$event.replace(
			/[^a-z0-9]/gi,
			"",
		)}-${Date.now()}@holiday.palace`

		openClientSelectMenu.value = false
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
				:schema="bookingFormSchema()"
				:state="store.form"
				@submit="model.submitForm(imageFiles)"
				class="space-y-4 w-full"
				@error="($event) => console.log($event)"
			>
				<u-form-field label="Client" name="client_id">
					<USelectMenu
						:autofocus="!store.form.id"
						@focus="
							() => {
								if (!store.form.client_id) openClientSelectMenu = true
							}
						"
						v-model:open="openClientSelectMenu"
						class="w-full"
						v-model="store.form.client_id"
						value-key="id"
						label-key="name"
						@update:model-value="handleClientUpdate"
						create-item
						@create="onCreateNewClient"
						:items="userStore.data.data"
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

				<u-form-field label="No. of adults" name="form.no_of_adults">
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

				<u-form-field label="Client email" name="email" v-if="newClient">
					<u-input
						v-model="store.form.new_client_email"
						icon="i-lucide-mail"
						type="email"
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
								useRouter().push({
									name: 'hotels-calendar',
								})
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
