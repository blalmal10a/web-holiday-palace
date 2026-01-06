import type { Toast } from "@nuxt/ui/runtime/composables/useToast.js";
export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            showToast: (data: Partial<Toast> | string) => {
                const toast = useToast();
                if (typeof data === 'string') {
                    toast.add({
                        title: data,
                    })
                } else {
                    toast.add(data)
                }
            },
        },
    }

})
