<script setup lang="ts">
	const store = useRoomStore()
	const model = useRoom()
	store.setPagination({
		...store.pagination,
		page: Number(useRoute().query.page) || 1,
		pageSize: Number(useRoute().query.pageSize) || 10,
	})
	model.fetchData()

	async function updatePage($event: number) {
		store.pagination.page = $event
		model.fetchData()
		useRouter().push({
			name: "index",
			query: {
				page: $event,
				pageSize: store.pagination.pageSize,
			},
		})
	}
</script>
<template>
	<div class="">
		<div class="flex justify-between px-3">
			<div class="text-xl"></div>
			<div>
				<u-button
					:to="{
						name: 'hotels-rooms-id-form',
						params: {
							id: 'add',
						},
					}"
					icon="i-lucide-plus"
					size="sm"
					variant="soft"
					color="info"
				>
					Add room
				</u-button>
			</div>
		</div>
		<UTable :data="store.data.data" :columns="roomColumns">
			<template #actions-cell="{row}">
				<div class="flex space-x-2 justify-end">
					<u-button
						variant="outline"
						size="sm"
						color="neutral"
						@click="
							() => {
								console.log(row.original)
								useRoomStore().setForm(row.original)
								useRouter().push({
									name: 'hotels-rooms-id-form',
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
						@click="
							useConfirmDeleteStore().open(
								row.original.name,
								'/rooms',
								row.original.id,
								'Room',
								useRoomStore(),
							)
						"
					>
						<!-- @click="room.deleteRoom(row.original.id)" -->
					</u-button>
				</div>
			</template>
		</UTable>
		<div class="flex justify-end border-t border-default pt-4 px-4">
			<USelect
				v-if="store.data.total > 1"
				v-model="store.pagination.pageSize"
				:items="[10, 15, 50, 100]"
				@update:model-value="
					($event: number) => {
						store.setPagination({
							...store.pagination,
							page: store.pagination.page,
							pageSize: $event,
						})
						model.fetchData()
						useRouter().push({
							name: 'hotels-rooms',
							query: {
								page: store.pagination.page,
								pageSize: $event,
							},
						})
					}
				"
			>
			</USelect>
			<UPagination
				v-if="store.data.total > store.pagination.pageSize"
				:page="store.pagination.page"
				:items-per-page="store.pagination.pageSize"
				:total="store.data.total"
				@update:page="updatePage"
			/>
		</div>
	</div>
</template>
