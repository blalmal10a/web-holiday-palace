<script lang="ts" setup>

	const toast = useToast()
const userStore = useUserStore()
const user = useUser();
	useHead({
		title: "Settings",
	})

onMounted(() => {
		if (!userStore.form.id && useRoute().params.id != "add") {
			user.fetchDetail()
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
				:schema="userFormSchema"
				:state="userStore.form"
				@submit="user.submitForm()"
				class="space-y-4 w-full"
			>
				<u-form-field label="name" name="name">
					<u-input
						v-model="userStore.form.name"
						icon="i-lucide-user"
						type="text"
					/>
				</u-form-field>
				<u-form-field label="email" name="email">
					<u-input
						v-model="userStore.form.email"
						icon="i-lucide-mail"
						type="email"
					/>
				</u-form-field>
				<u-form-field label="password" name="password">
					<u-input
						v-model="userStore.form.password"
						icon="i-lucide-lock"
						type="password"
						autocomplete="new-password"
					/>
				</u-form-field>
				<u-form-field label="confirm password" name="password_confirmation">
					<u-input
						v-model="userStore.form.password_confirmation"
						icon="i-lucide-lock"
						type="password"
						autocomplete="new-password"
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
