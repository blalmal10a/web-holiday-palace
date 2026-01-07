<template>
    <UModal
        title="Confirm delete"
        v-model:open="useConfirmDeleteStore().show"
    >
        <template #body>
            Are you sure you want to delete?
        </template>
        <template #footer>
            <div class="flex justify-end space-x-2 w-full ">
                <UButton
                    color="neutral"
                    variant="outline"
                    label="Cancel"
                    :disabled="useConfirmDeleteStore().loadingDelete"
                />
                <UButton
                    color="error"
                    label="Delete"
                    :loading="useConfirmDeleteStore().loadingDelete"
                    @click="useConfirmDeleteStore().delete()"
                />
            </div>
        </template>
    </UModal>
</template>