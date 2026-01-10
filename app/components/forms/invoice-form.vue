<script setup lang="ts">
const bookingStore = useBookingStore();
onMounted(() => {
    // 
})
const invoice = ref<Invoice>(bookingStore.form.invoice);
</script>
<template>
    <div class="min-h-dvh">
        <pre>
    {{ invoice }}
        </pre>

    </div>
</template>