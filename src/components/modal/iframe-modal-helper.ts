import { openModal } from '../backdrop/BackdropStore2';
import iFrameModal from './iframe-modal.svelte';
import { md5 } from '../../utils/hash/hash';
export const openIFrameModal = (url: string, title?: string, messagePayload?: any) => {
  openModal({
    component: iFrameModal,
    id: `id-${md5(url)}`,
    componentProps: {
      url,
      title: title || url,
      messagePayload,
    },
  });
};
