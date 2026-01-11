<script setup lang="ts">
const invoiceStore = useInvoiceStore();
const store = usePaymentStore();
</script>
<template>
    <UModal
        v-model:open="invoiceStore.showInvoicePaymentFormModal"
        @after:leave="() => {
            store.$reset();
        }"
    >
        <template #title>
            Payment form
        </template>
        <template
            #body
            aria-describedby="Payment form"
        >
            <FormsPaymentItemForm />
        </template>
    </UModal>
</template>