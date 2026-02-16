<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'
import { format } from 'date-fns';

const items: StepperItem[] = [
    {
        title: 'Address',
        name: 'form',
        description: 'Add your address here',
    }, {
        title: 'Shipping',
        description: 'Set your preferred shipping method',
        name: 'confirm'
    }
]
const errors = ref({
    name: '',
    phone: '',
    no_of_adults: '',
    no_of_children: '',
    check_in_date: '',
    checkout_date: '',
})

const bookingStore = useWebsiteStore();
const calendarStore = useCalendarStore();
const formRef = useTemplateRef('formRef')
const totalCost = computed(
    () => {
        if (!calendarStore.selectedCells[0] || !calendarStore.selectedCells[1]) {
            return 0;
        }
        const checkInDate = calendarStore.selectedCells[0].date;
        const checkOutDate = calendarStore.selectedCells[1].date;
        const dateList = getBookingDateList(checkInDate, checkOutDate)
        let totalCost = 0;
        totalCost = calendarStore.selectedCells[1].room.rate * dateList.length;
        return totalCost;
    }
)
const message = computed(() => {
    const startCell = calendarStore.selectedCells[0]!
    const endCell = calendarStore.selectedCells[1]!
    let url = `${window.location.origin}/hotels/calendar?start_date=${startCell.date}&end_date=${endCell.date}&room_id=${startCell.room.id}`
    if (calendarStore.clientData.id) {
        url += `&client_id=${calendarStore.clientData.id}`
    }
    url += `&client_name=${bookingStore.booking_form.name}&client_phone=${bookingStore.booking_form.phone}`
    let msg = `Hello, i would like to make booking

Name: ${bookingStore.booking_form.name}
Phone: ${bookingStore.booking_form.phone}
No of adults: ${bookingStore.booking_form.no_of_adults}
${bookingStore.booking_form.no_of_children ? `No of children: ${bookingStore.booking_form.no_of_children}` : ''}
Room: ${startCell.room.number}
Check in: ${format(startCell.date, 'Do MMM, yyyy')}
Check out: ${format(endCell.date, 'Do MMM, yyyy')}

url: ${url.replaceAll(' ', '+')}
    `
    return msg;
})

function onSubmitForm() {
    openWhatsapp(message.value, '9774888724')
    calendarStore.showBookingSummary = false;
    useWebsiteStore().$reset();
}
</script>

<template>
    <div class="w-full">
        <u-form
            ref="formRef"
            :state="bookingStore.booking_form"
            class="space-y-4 w-full "
            :schema="websiteBookingSchema()"
            @error="($event) => console.log($event)"
            @submit="onSubmitForm"
        >

            <u-form-field
                label="Phone"
                name="phone"
            >
                <u-input
                    class="w-full"
                    v-model="bookingStore.booking_form.phone"
                    icon="i-lucide-phone"
                />
            </u-form-field> <u-form-field
                label="Name"
                name="name"
            >
                <u-input
                    class="w-full"
                    v-model="bookingStore.booking_form.name"
                    icon="i-lucide-user"
                />
            </u-form-field>


            <u-form-field
                label="No. of adults"
                name="no_of_adults"
            >
                <u-input
                    class="w-full"
                    v-model="bookingStore.booking_form.no_of_adults"
                    icon="i-lucide-indian-rupee"
                    type="number"
                />
            </u-form-field>
            <u-form-field
                label="no. of children"
                name="no_of_children"
            >
                <u-input
                    class="w-full"
                    v-model="bookingStore.booking_form.no_of_children"
                    icon="i-lucide-indian-rupee"
                    type="number"
                />
            </u-form-field>

            <div>
                <table>
                    <tr v-if="calendarStore.selectedCells[0]">
                        <td>Room</td>
                        <td>
                            <div class="px-2">
                                :
                            </div>
                        </td>
                        <td>{{ calendarStore.selectedCells[0].room.number }}</td>
                    </tr>
                    <tr v-if="calendarStore.selectedCells[0]">
                        <td>Check in</td>
                        <td>
                            <div class="px-2">
                                :
                            </div>
                        </td>
                        <td>{{ format(calendarStore.selectedCells[0].date, 'Do MMM, yyyy') }}</td>
                    </tr>
                    <tr v-if="calendarStore.selectedCells[1]">
                        <td>Check out</td>
                        <td>
                            <div class="px-2">
                                :
                            </div>
                        </td>
                        <td>{{ format(calendarStore.selectedCells[1].date, 'Do MMM, yyyy') }}</td>
                    </tr>
                    <tr v-if="calendarStore.selectedCells[0] && calendarStore.selectedCells[1]">
                        <td>Expected cost</td>
                        <td>
                            <div class="px-2">
                                :
                            </div>
                        </td>
                        <td>
                            {{ toRupees(totalCost) }}
                        </td>
                    </tr>
                </table>
            </div>
            <div class="w-full flex justify-end space-x-2">
                <UButton
                    color="neutral"
                    variant="soft"
                    @click="useCalendarStore().showBookingSummary = false"
                >
                    Cancel
                </UButton>
                <UButton
                    color="primary"
                    variant="soft"
                    type="submit"
                >
                    Make whatsapp booking
                </UButton>
            </div>

        </u-form>


    </div>
</template>
