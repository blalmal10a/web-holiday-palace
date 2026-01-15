<script setup lang="ts">
const store = useUserStore();
const user = useUser()

if (!store.detail.id) {
    await user.fetchDetail(useBookingStore().selectedClient.id)
}
const blacklistedUserList = ref<User[]>([])
const selectedUserIds = ref<string[]>([])
await getBlacklistedUsers();
onMounted(
    () => {
        if (store.detail.blacklisted_users?.length)
            selectedUserIds.value = store.detail.blacklisted_users.map((user: User) => user.id)
    }
)
async function updateRelatedBlacklist() {
    // store.form.blacklisted_user_ids
    store.form.related_blacklist_ids = selectedUserIds.value ?? [];
    await user.submitForm()
    store.showBlacklistedUserModal = false;
    const bookingStore = useBookingStore();
    if (bookingStore.form.id) {
        // 
    }
}
onBeforeUnmount(
    () => {
        user.fetchDetail(useBookingStore().selectedClient.id)
    }
)
async function getBlacklistedUsers() {
    const response = await api.get('users', {
        params: {
            only_blacklisted: true,
            pageSize: Number.MAX_SAFE_INTEGER,
        }
    })

    blacklistedUserList.value = (response.data as User[]).filter((user: User) => user.id !== store.detail.id);
}
</script>
<template>
    <div class="">
        <UCheckboxGroup
            variant="card"
            id="blacklist-checkbox-group"
            indicator="end"
            class="w-full"
            color="warning"
            v-if="blacklistedUserList.length"
            v-model="selectedUserIds"
            :items="blacklistedUserList"
            label-key="name"
            value-key="id"
            description-key="phone"
        />
        <div class="text-right">
            <UButton
                label="Save"
                @click="updateRelatedBlacklist"
            />
        </div>
    </div>
</template>
<style scoped>
table {
    text-align: left;
    border-collapse: collapse;
    border: 1px solid #ccc;
}

th {
    border: 1px solid #ccc;
    padding: 0.5rem;
}

td {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 0.5rem;
}
</style>