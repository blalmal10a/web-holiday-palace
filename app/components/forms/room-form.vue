<script lang="ts" setup>
const store = useRoomStore()
const model = useRoom();
const user = useUser();
const userStore = useUserStore();
onMounted(() => {
	if (!store.form.id && useRoute().params.id != "add") {
		model.fetchDetail()
	}
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
				:schema="userFormSchema"
				:state="store.form"
				@submit="model.submitForm()"
				class="space-y-4 w-full"
			>
				<u-form-field
					label="Name"
					name="name"
				>
					<u-input
						v-model="store.form.name"
						icon="i-lucide-user"
						type="text"
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
					label="Staff"
					name="staff_id"
				>
					<USelectMenu
						class="w-full"
						v-model="store.form.staff_id"
						value-key="id"
						label-key="name"
						:items="userStore.data.data"
					/>

				</u-form-field>
				<div class="text-right space-x-2">
					<u-button
						variant="outline"
						color="neutral"
						:loading="auth.loadingSubmitUpdateProfile"
						class=""
						@click="
							useRouter().push({
								name: 'hotels-rooms',
							})
							"
					>
						Cancel
					</u-button>
					<u-button
						:loading="auth.loadingSubmitUpdateProfile"
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
