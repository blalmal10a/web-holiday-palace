<script lang="ts" setup>
import type { SelectMenuItem } from '@nuxt/ui'

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
const newClient = ref(false)
const currentClient = computed(() => {
	const user = userStore.data.data.find(
		(user: User) => user.id === store.form.client_id,
	)
	if (user?.is_blacklisted && store.form.id) {
		store.form.mark_as_blacklisted = true;
	}
	if (user) {
		store.selectedClient = { ...user };
	}
	return user;
})
const imageFiles = ref<File[]>([])
userStore.pagination.exclude_admin = true
const blackListedUserList = ref<User[]>([])

const userList = computed(
	() => {
		blackListedUserList.value = [];
		return userStore.data.data.map((user: User) => {
			if (user.is_blacklisted) {
				blackListedUserList.value.push(user)
			}
			return {
				id: user.id,
				name: user.name,
				phone: user.phone,
				is_blacklisted: user.is_blacklisted,
				avatar: {
					class: {
						'bg-red-500 text-white': user.is_blacklisted
					},
					icon: user.is_blacklisted ? 'i-lucide-user-x' : 'i-lucide-user',

				}
			} satisfies SelectMenuItem
		})
	}
)
const isOverPaid = computed(
	() => {
		// 
		let total = 0
		let roomCost = 0;
		let paidAmount = 0;
		if (store.detail.id) {
			total = store.detail.invoice.items.reduce((total, item) => {
				return total + (item.rate * item.quantity);
			}, 0);
			try {
				paidAmount = store.detail.invoice.payments.reduce((total, payment) => {
					return total + payment.amount;
				}, 0);
			} catch (error) {
				console.log('calculate total paid amount error')
			}
		} else {
			const dateList = getBookingDateList(
				store.form.check_in_date,
				store.form.checkout_date,
			)
			if (store.form.room_id) {
				const selectedRoom = roomStore.data.data.find(
					(room) => room.id === store.form.room_id
				)
				if (selectedRoom) {
					roomCost = selectedRoom.rate * dateList?.length
				}
			}
			total = roomCost
			paidAmount = store.form.deposit ?? 0;
		}
		return paidAmount > total;
	}
)
await user.fetchData()
await room.fetchData()
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
	if (props.isModal) {
		populateStaff(store.form.room_id)
	}

})


function populateStaff($event: string) {
	const room = roomStore.data.data.find((room: Room) => room.id === $event)
	if (room) {
		store.form.staff_id = room.staff_id
	}
}
function handleClientUpdate($event: string) {
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
		<u-card style="min-width: min(400px, 90vw); max-width: 90vw;">
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
					:error="currentClient?.is_blacklisted ? `Client is blacklisted` : false"
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
						:items="userList"
					/>
				</u-form-field>
				<u-form-field
					label="Phone"
					name="new_client_phone"
					v-if="newClient"
				>
					<u-input
						:disabled="!newClient"
						v-model="store.form.new_client_phone"
						icon="i-lucide-phone"
					/>
				</u-form-field>

				<u-form-field
					name="mark_as_blacklisted"
					v-if="store.form.id"
				>
					<u-checkbox
						color="error"
						variant="card"
						indicator="end"
						v-model="store.form.mark_as_blacklisted"
						label="Mark as blacklisted"
						description="Mark current customer as black list"
					/>
				</u-form-field>
				<u-form-field
					label="Client"
					name="client_id"
					v-if="store.form.mark_as_blacklisted"
					:hint="currentClient ? `Phone: ${currentClient.phone}` : ''"
					:error="currentClient?.is_blacklisted ? `Client is blacklisted` : false"
				>
					<USelectMenu
						:filter-fields="['name', 'phone']"
						class="w-full"
						v-model="store.form.related_client_id"
						value-key="id"
						label-key="name"
						description-key="phone"
						create-item
						:items="blackListedUserList"
					/>
				</u-form-field>
				<div
					v-if="currentClient?.is_blacklisted"
					class="text-right -mt-4"
				>
					<UButton
						variant="outline"
						color="warning"
						size="xs"
						@click="userStore.showBlacklistedUserModal = true"
						label="Manage related blacklists"
					/>
				</div>
				<u-form-field
					label="Room"
					name="room_id"
				>
					<USelectMenu
						class="w-full"
						v-model="store.form.room_id"
						@update:model-value="populateStaff"
						value-key="id"
						label-key="name"
						:items="roomStore.data.data"
					/>
				</u-form-field>

				<u-form-field
					label="No. of adults"
					name="no_of_adults"
				>
					<u-input
						v-model="store.form.no_of_adults"
						icon="i-lucide-indian-rupee"
						type="number"
					/>
				</u-form-field>
				<u-form-field
					label="no. of children"
					name="no_of_children"
				>
					<u-input
						v-model="store.form.no_of_children"
						icon="i-lucide-indian-rupee"
						type="number"
					/>
				</u-form-field>
				<u-form-field
					label="Check in date"
					name="check_in_date"
				>
					<u-input
						v-model="store.form.check_in_date"
						icon="i-lucide-layers"
						type="date"
					/>
				</u-form-field>
				<u-form-field
					label="Check out date"
					name="checkout_date"
				>
					<u-input
						v-model="store.form.checkout_date"
						icon="i-lucide-layers"
						type="date"
					/>
				</u-form-field>
				<u-form-field
					label="Deposit amount"
					name="deposit"
					:error="isOverPaid ? 'Deposit amount is overpaid' : false"
				>
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
		<UsersBlackListedUserModal />
	</div>
</template>

<style scoped>
.relative.inline-flex.items-center {
	width: 100%;
}
</style>
