<script setup lang="ts">
import { format } from 'date-fns';

const paymentStore = usePaymentStore();
const invoiceStore = useInvoiceStore();
onMounted(() => {
    paymentStore.form.invoice_id = invoiceStore.form.id as string;
    if (!paymentStore.form.id) {
        paymentStore.form.date = format(new Date(), 'yyyy-MM-dd')
        paymentStore.form.mode = "Online";
    }
})
</script>
<template>
    <div class="flex flex-col items-center">
        <u-card style="max-width: 400px; min-width: min(90vw, 400px);">
            <UForm
                :schema="paymentFormSchema()"
                :state="paymentStore.form"
                @submit="usePayment().addPayment(paymentStore.form)"
                @error="($event: any) => {
                    console.log($event);
                }"
            >
                <UFieldGroup class="grid  gap-2">

                    <UFormField
                        name="date"
                        label="Date"
                    >
                        <UInput
                            class="w-full"
                            placeholder="date"
                            v-model="paymentStore.form.date"
                            :default-value="format(new Date(), 'yyyy-MM-dd')"
                            icon="i-lucide-calendar"
                            type="date"
                        />
                    </UFormField>
                    <UFormField
                        name="amount"
                        label="Amount"
                    >
                        <UInput
                            autofocus
                            class="w-full"
                            placeholder="Amount"
                            v-model="paymentStore.form.amount"
                            icon="i-lucide-indian-rupee"
                            type="number"
                        />
                    </UFormField>
                    <UFormField
                        label="Payment mode"
                        name="mode"
                    >
                        <u-input-menu
                            open-on-click
                            placeholder="Payment mode"
                            class="w-full"
                            v-model="paymentStore.form.mode"
                            default-value="Online"
                            :items="[
                                'Cash',
                                'Online'
                            ]"
                        />
                    </UFormField>
                </UFieldGroup>
                <div class="flex justify-end mt-4">
                    <UButton
                        type="submit"
                        label="Add item"
                    ></UButton>
                </div>
            </UForm>
        </u-card>
    </div>
</template>