<script setup lang="ts">
// 
const userStore = useUserStore();
</script>
<template>
    <UModal v-model:open="userStore.showBlacklistedUserModal">
        <template #title>
            RELATED BLACKLIST USERS
        </template>
        <template #body>
            <UsersListBlacklisted />
        </template>
    </UModal>
</template>
