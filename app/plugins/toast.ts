export default defineNuxtPlugin(() => {
    const toast = useToast()
    function notify(title: string, description: string | undefined = undefined) {
        toast.add({
            title,
            description,
            color: 'success',
            icon: 'i-heroicons-check-circle'
        })
    }
    notify.add = (title: string, description: string | undefined = undefined) => {
        toast.add({
            title,
            description,
            color: 'success',
            icon: 'i-heroicons-check-circle'
        })
    }
    notify.success = (title: string, description: string | undefined = undefined) => {
        toast.add({
            title,
            description,
            color: 'success',
            icon: 'i-heroicons-check-circle'
        })
    }
    notify.error = (title: string, description: string | undefined = undefined) => {
        toast.add({
            title,
            description,
            color: 'error',
            icon: 'i-heroicons-x-circle'
        })
    }
    notify.warning = (title: string, description: string) => {
        toast.add({
            title,
            description,
            color: 'warning',
            icon: 'i-heroicons-exclamation-triangle'
        })
    }
    return {
        provide: {
            notify,
        }
    }
})
