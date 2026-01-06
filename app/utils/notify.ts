import type { Toast } from "@nuxt/ui/runtime/composables/useToast.js";

import { useNuxtApp } from '#app'


export const notify = (data: Partial<Toast> | string) => {
  useNuxtApp().$showToast(data);
}

notify.error = (titleOrMessage: Partial<Toast> | string, subTitle: string | null = null) => {
  let data: Partial<Toast> = {
    icon: 'i-lucide-alert-circle',
  }

  if (typeof titleOrMessage === 'string') {
    data.title = titleOrMessage
    if (subTitle) {
      data.title = titleOrMessage
      data.description = subTitle
    }
  } else {
    data = {
      ...titleOrMessage
    }
  }
  data.color = 'error'
  notify(data);
}



notify.success = (titleOrMessage: Partial<Toast> | string, subTitle: string | null = null) => {
  let data: Partial<Toast> = {
    icon: 'i-lucide-alert-circle',
  }

  if (typeof titleOrMessage === 'string') {
    data.description = titleOrMessage
    if (subTitle) {
      data.title = titleOrMessage
      data.description = subTitle
    }
  } else {
    data = {
      ...titleOrMessage
    }
  }
  data.color = 'success'
  notify(data);
}


export const notifyError = (error: any) => {
  if (error && typeof error === 'object') {
    let msg = error?.response?._data?.message || error.message;
    notify.error(msg);
  }

  // if (error instanceof ) {
  //   console.log('error cause: ', error.cause);
  //   console.log('error message: ', error.message);
  //   console.log('error stacl: ', error.stack);
  // }

}