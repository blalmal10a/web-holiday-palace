
export const useConfirmDeleteStore = defineStore('confirm-delete', {
    state: () => ({
        loadingDelete: false,
        show: false,
        endpoint: '',
        model: '',
        title: '',
        id: '',

    }),
    actions: {
        open(title: string, endpoint: string, id: string, model: string | undefined,) {
            this.show = true;
            this.title = title;
            this.endpoint = endpoint;
            this.model = model ?? '';
            this.id = id;
        },
        close() {
            this.show = false;
        },
        async delete() {
            try {
                this.loadingDelete = true;
                const data = await api.delete(`${this.endpoint}/${this.id}`)
                if (this.model === 'User') {
                    useUserStore().setData(data);
                }
                this.$reset();
            } catch (error) {
                // notify error
            } finally {
                this.loadingDelete = false;
            }
        }
        // 
    },
});