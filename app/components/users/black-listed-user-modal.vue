<script setup lang="ts">
// 
const userStore = useUserStore();
</script>
<template>
    <UModal v-model:open="userStore.showBlacklistedUserModal">
        <template #body>
            <UsersListBlacklisted />
        </template>
    </UModal>
</template>
