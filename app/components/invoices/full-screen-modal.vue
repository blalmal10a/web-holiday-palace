    <script setup lang="ts">

    const store = useInvoiceStore();
</script>
    <template>
        <UModal
            v-model:open="store.showInvoiceFormModal"
            fullscreen
        >
            <template #title>Invoice Form</template>
            <template #body>
                <FormsInvoiceForm is-modal />
            </template>
        </UModal>
    </template>