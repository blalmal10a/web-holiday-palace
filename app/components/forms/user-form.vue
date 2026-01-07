<script lang="ts" setup>

const toast = useToast()
const store = useUserStore()
const model = useUser();

onMounted(() => {
	if (!store.form.id && useRoute().params.id != "add") {
		model.fetchDetail()
	}
	if (useRoute().params.id == 'add') {
		store.update_password = true;
	}
})

</script>
<template>
	<div
		class="flex flex-col items-center"
		style="height: calc(100dvh - 200px); overflow: visible"
	>
		<u-card style="min-width: min(400px, 90vw)">
			<u-form
				:schema="userFormSchema(store.update_password)"
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
					label="email"
					name="email"
				>
					<u-input
						v-model="store.form.email"
						icon="i-lucide-mail"
						type="email"
					/>
				</u-form-field>
				<u-switch
					v-if="store.form.id"
					v-model="store.update_password"
					label="Update password"
					@update:model-value="(val) => {
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
				<div class="text-right space-x-2">
					<u-button
						variant="outline"
						color="neutral"
						:loading="auth.loadingSubmitUpdateProfile"
						class=""
						@click="
							useRouter().push({
								name: 'index',
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
