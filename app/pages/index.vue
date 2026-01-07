<script setup lang="ts">
	definePageMeta({
		layout: "main-layout",
		pageTitle: "Home",
	})
	const userStore = useUserStore()
	userStore.getUsers({}, useToast())
</script>
<template>
	<div class="">
		<UTable
			:data="userStore.data.data"
			:columns="userColumns"
			@update:pagination="
				(e) => {
					console.log(e)
				}
			"
		>
			<template #actions-cell="{row}">
				<div class="flex space-x-2">
					<u-button
						variant="outline"
						size="sm"
						color="neutral"
						@click="
							useRouter().push({
								name: 'hotels-users-id-form',
								params: {
									id: row.original.id,
								},
							})
						"
						icon="i-lucide-edit"
					>
					</u-button>
					<u-button
						variant="outline"
						size="sm"
						color="error"
						icon="i-lucide-trash"
						@click="userStore.confirmDeleteUser(row.original.id)"
					>
					</u-button>
				</div>
			</template>
		</UTable>
		<!-- @select="
				(val, {original}) => {
					userStore.form = {
						...original,
						password: '',
						password_confirmation: '',
						roles: undefined,
					}
					useRouter().push({
						name: 'hotels-users-id-form',
						params: {
							id: original.id,
						},
					})
				}
			" -->
	</div>
</template>
