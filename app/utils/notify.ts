
export const notifyError = (error: any) => {
  const { $notify } = useNuxtApp()
  if (error && typeof error === 'object') {
    let msg = error?.response?._data?.message || error.message;
    $notify.error(msg);
  }
}