import {Ref} from 'vue'
import {QuickOptionItem} from '@/components/CommonUI/QuickOptions/enum'
import {useSpeechSynthesis} from '@vueuse/core'

let synth: SpeechSynthesis = window.speechSynthesis
export const qLogicSpeechSynthesis = (valRef: Ref<string>): QuickOptionItem => {
  return {
    label: '🗣 Speech Synthesis',
    children: () => {
      const voice = ref<SpeechSynthesisVoice>(undefined as unknown as SpeechSynthesisVoice)
      const speech = useSpeechSynthesis(valRef, {
        voice,
      })
      let voices: SpeechSynthesisVoice[] = synth?.getVoices() || []
      voice.value = voices[0]

      return [
        {
          label: 'Stop',
          props: {
            onClick: () => {
              speech.stop()
            },
          },
        },
        ...voices.map((v) => {
          return {
            label: v.name,
            props: {
              onClick: () => {
                speech.stop()
                voice.value = v
                setTimeout(() => {
                  speech.speak()
                }, 100)
              },
            },
          }
        }),
      ]
    },
  }
}
