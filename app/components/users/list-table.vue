<script setup lang="ts">
const userStore = useUserStore()
const user = useUser();
user.fetchData();
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
			<template #actions-cell="{ row }">
				<div class="flex space-x-2">
					<u-button
						variant="outline"
						size="sm"
						color="neutral"
						@click="
							() => {
								useUserStore().setForm(row.original);
								useRouter().push({
									name: 'hotels-users-id-form',
									params: {
										id: row.original.id,
									},
								})
							}
						"
						icon="i-lucide-edit"
					>
					</u-button>
					<u-button
						variant="outline"
						size="sm"
						color="error"
						icon="i-lucide-trash"
						@click="useConfirmDeleteStore().open(row.original.name, '/users', row.original.id, 'User')"
					>
						<!-- @click="user.deleteUser(row.original.id)" -->
					</u-button>
				</div>
			</template>
		</UTable>
	</div>
</template>