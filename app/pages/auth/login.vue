<script lang="ts" setup>
definePageMeta({
	layout: "auth-layout",
})
</script>

<template>
	<div class="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
		<div
			class="w-full max-w-sm sm:max-w-4xl flex items-center justify-center sm:grid sm:grid-cols-2 sm:shadow-2xl sm:rounded-xl sm:bg-white dark:sm:bg-gray-800 overflow-hidden">
			<div class="hidden sm:block">
				<div class="bg-cover bg-center flex items-center justify-center">
					<LoginPin />
				</div>
			</div>

			<div class="p-8 sm:p-12">
				<div class="max-w-md mx-auto">
					<h2 class="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
						Sign In
					</h2>
					<p class="mb-8 text-gray-500 dark:text-gray-400">
						Access your account with your credentials.
					</p>

					<UCard class="shadow-none">
						<UForm
							:schema="LoginSchema"
							:state="auth.form"
							@submit="auth.login"
							class="space-y-6"
						>
							<UFormField
								label="Phone"
								name="phone"
							>
								<UInput
									class="w-full"
									v-model="auth.form.phone"
									icon="i-heroicons-envelope"
									type="phone"
									size="lg"
								/>
							</UFormField>

							<UFormField
								label="Password"
								name="password"
							>
								<UInput
									class="w-full"
									v-model="auth.form.password"
									icon="i-heroicons-lock-closed"
									type="password"
									size="lg"
								/>
							</UFormField>

							<UCheckbox
								v-model="auth.form.remember"
								label="Remember me"
								name="remember"
							/>

							<UButton
								type="submit"
								block
								size="xl"
								:loading="auth.loadingSubmitLogin"
								icon="i-heroicons-arrow-right-on-rectangle"
							>
								Login
							</UButton>
						</UForm>
					</UCard>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
/* Optional: Add a smooth transition for card and button effects */
</style>
