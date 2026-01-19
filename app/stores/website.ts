import z from "zod"

export const useWebsiteStore = defineStore('website', {
    state: () => ({
        booking_form: {} as WebsiteBookingForm
    })
    ,
})

export const websiteBookingSchema = () => {
    const baseSchema = z.object({
        id: z.string().optional().nullable(),
        name: z.string().min(1, 'Name is required'),
        phone: z.string().min(1, 'Phone is required'),
        no_of_adults: z.number().min(1, 'No of adults is required'),
        no_of_children: z.number().optional().nullable(),
    }) satisfies z.ZodType<WebsiteBookingForm>
    return baseSchema
}