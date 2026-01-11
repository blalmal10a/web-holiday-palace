<script lang="ts" setup>
const store = useExpenditureStore()
const model = useExpenditure();
const user = useUser();
const userStore = useUserStore();
const selectStaffRef = ref<HTMLButtonElement>();
const computedAmount = computed(() => {
	store.form.amount = store.form.rate * store.form.quantity
	return store.form.amount || 0;
})
const openMenu = ref(false);
onMounted(() => {
	if (!store.form.id && useRoute().params.id != "add") {
		model.fetchDetail()
	}
	// selectStaffRef.value?.blur();
})
userStore.pagination.exclude_clients = true;
user.fetchData()
onBeforeUnmount(
	() => {
		userStore.pagination.exclude_clients = false;
	}
)
</script>
<template>
	<div
		class="flex flex-col items-center"
		style="height: calc(100dvh - 200px); overflow: visible"
	>
		<u-card style="min-width: min(400px, 90vw)">
			<u-form
				:schema="expenditreFormSchema()"
				:state="store.form"
				@submit="model.submitForm()"
				class="space-y-4 w-full"
			>
				<u-form-field
					label="Date"
					name="date"
				>
					<u-input
						v-model="store.form.date"
						icon="i-lucide-layers"
						type="date"
					/>
				</u-form-field>
				<u-form-field
					label="Staff"
					name="staff_id"
				>
					<USelectMenu
						v-model:open="openMenu"
						ref="selectStaffRef"
						create-item
						icon="i-lucide-user"
						class="w-full"
						value-key="id"
						label-key="name"
						v-model="store.form.staff_id"
						:items="userStore.data.data"
						@update:model-value="($event: string) => {
							// close the menu
							store.form.name = '';
						}"
						@create="($event: string) => {
							store.form.staff_id = $event;
							store.form.name = $event;
							openMenu = false;
							nextTick(
								() => {
									store.form.name = $event;
								}
							)
						}"
					/>

				</u-form-field>
				<u-form-field
					label="Phone"
					name="phone"
				>
					<u-input
						v-model="store.form.phone"
						icon="i-lucide-tag"
					/>
				</u-form-field>
				<u-form-field
					label="Item"
					name="item"
				>
					<u-input
						v-model="store.form.item"
						icon="i-lucide-tag"
					/>
				</u-form-field>
				<u-form-field
					label="Rate"
					name="rate"
				>
					<u-input
						v-model="store.form.rate"
						icon="i-lucide-indian-rupee"
						type="number"
						step="0.01"
					/>
				</u-form-field>
				<u-form-field
					label="Quantity"
					name="quantity"
				>
					<u-input
						v-model="store.form.quantity"
						icon="i-lucide-layers"
						type="number"
						step="0.01"
					/>
				</u-form-field>

				<div class="flex justify-between items-baseline">
					<div class="text-xs">
						Amount: {{ toRupees(computedAmount) }}
					</div>
					<div class="flex justify-end space-x-2">
						<u-button
							size="lg"
							variant="outline"
							color="neutral"
							class="h-full"
							:disabled="store.loadingSubmitExpenditureForm"
							@click="
								() => {
									useInvoiceStore().showInvoiceFormModal = false;
								}
							"
						>
							Cancel
						</u-button>
						<u-button
							size="lg"
							:loading="store.loadingSubmitExpenditureForm"
							class=""
							type="submit"
						>
							Submit
						</u-button>
					</div>
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
