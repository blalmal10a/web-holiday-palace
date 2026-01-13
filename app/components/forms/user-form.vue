<script lang="ts" setup>
const toast = useToast()
const store = useUserStore()
const model = useUser()

onMounted(() => {
	if (!store.form.id && useRoute().params.id != "add") {
		model.fetchDetail()
	}
	if (useRoute().params.id == "add") {
		store.update_password = true
	}
})
</script>
<template>
	<div
		class="flex flex-col items-center"
		style="min-height: calc(100dvh - 200px); overflow: visible"
	>

		<u-card style="min-width: min(400px, 90vw)">
			<u-form
				:schema="userFormSchema(store.update_password)"
				:state="store.form"
				@submit="model.submitForm()"
				class="space-y-4 w-full"
				@error="console.log($event)"
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
					label="Phone"
					name="phone"
				>
					<u-input
						v-model="store.form.phone"
						icon="i-lucide-phone"
						type="phone"
					/>
				</u-form-field>
				<u-form-field name="is_blacklisted">
					<u-checkbox
						indicator="end"
						variant="card"
						label="Blacklisted"
						description="Check if the user is blacklisted"
						v-model="store.form.is_blacklisted"
						type="is_blacklisted"
					/>
				</u-form-field>
				<u-switch
					v-if="store.form.id"
					v-model="store.update_password"
					label="Update password"
					@update:model-value="(val: boolean) => {
						if (!val) {
							store.setForm({
								...store.form,
								password: '',
								password_confirmation: '',
							})
						}
					}
					"
				>
				</u-switch>
				<template v-if="!store.form.id || store.update_password">
					<u-form-field
						label="password"
						name="password"
					>
						<u-input
							v-model="store.form.password"
							icon="i-lucide-lock"
							type="password"
							autocomplete="new-password"
						/>
					</u-form-field>
					<u-form-field
						label="confirm password"
						name="password_confirmation"
					>
						<u-input
							v-model="store.form.password_confirmation"
							icon="i-lucide-lock"
							type="password"
							autocomplete="new-password"
						/>
					</u-form-field>
				</template>
				<div class="flex justify-end space-x-2">
					<u-button
						size="lg"
						variant="outline"
						color="neutral"
						class="h-full"
						:disabled="store.loadingSubmitUserForm"
						@click="
							() => {
								useInvoiceStore().showInvoiceFormModal = false
								if (useRoute().name == 'hotels-users-id-form') {
									useRouter().push({
										name: 'index',
									})
								}
							}
						"
					>
						Cancel
					</u-button>
					<u-button
						size="lg"
						:loading="store.loadingSubmitUserForm"
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
