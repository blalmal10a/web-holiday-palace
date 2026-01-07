<script setup lang="ts">
const roomStore = useRoomStore()
const room = useRoom();
room.fetchData();
</script>
<template>
	<div class="">
		<UTable
			:data="roomStore.data.data"
			:columns="roomColumns"
			@update:pagination="
				(e) => {
					console.log(e)
				}
			"
		>
			<template #actions-cell="{ row }">
				<div class="flex space-x-2 justify-end">
					<u-button
						variant="outline"
						size="sm"
						color="neutral"
						@click="
							() => {
								useRoomStore().setForm(row.original);
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
						@click="useConfirmDeleteStore().open(row.original.name, '/rooms', row.original.id, 'Room', useRoomStore())"
					>
						<!-- @click="room.deleteRoom(row.original.id)" -->
					</u-button>
				</div>
			</template>
		</UTable>
	</div>
</template>