import { sendGAEvent } from '@next/third-parties/google'

export const trackComponentCopy = (componentName: string, method: 'cli' | 'manual') => {
  sendGAEvent({ 
    event: 'copy_component', 
    value: {
      name: componentName,
      method: method
    } 
  })
}