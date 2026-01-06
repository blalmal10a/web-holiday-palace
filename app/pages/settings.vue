<script lang="ts" setup>
	definePageMeta({
		layout: "main-layout",
		pageTitle: "Settings",
		ancestors: [],
	})
	useHead({
		title: "Settings",
	})
	onMounted(() => {
		const user = useSanctumUser<User>().value
		if (user) {
			auth.form.name = user.name
			auth.form.email = user.email
		}
	})

	const toast = useToast()
	async function onSubmit() {
		await auth.onSubmitUpdateProfile()
		toast.add({
			title: "Profile updated successfully",
		})
	}
</script>
<template>
	<div
		class="flex items-center justify-center"
		style="height: calc(100dvh - 200px); overflow: visible"
	>
		<u-card style="min-width: min(400px, 90vw)">
			<u-form
				:schema="UpdateProfileSchema"
				:state="auth.form"
				@submit="onSubmit"
				class="space-y-4 w-full"
			>
				<u-form-field label="name" name="name">
					<u-input v-model="auth.form.name" icon="i-lucide-user" type="text" />
				</u-form-field>
				<u-form-field label="email" name="email">
					<u-input
						v-model="auth.form.email"
						icon="i-lucide-mail"
						type="email"
					/>
				</u-form-field>
				<u-form-field label="password" name="password">
					<u-input
						v-model="auth.form.password"
						icon="i-lucide-lock"
						type="password"
						autocomplete="new-password"
					/>
				</u-form-field>
				<u-form-field label="confirm password" name="password_confirmation">
					<u-input
						v-model="auth.form.password_confirmation"
						icon="i-lucide-lock"
						type="password"
						autocomplete="new-password"
					/>
				</u-form-field>
				<div class="text-right">
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
