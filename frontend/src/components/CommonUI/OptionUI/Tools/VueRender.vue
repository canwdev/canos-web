<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'VueRender',
  props: {
    renderFn: {
      type: [Object, Function],
      required: true,
    },
  },
  render() {
    if (typeof this.renderFn === 'function') {
      return this.renderFn()
    }
    return this.renderFn
  },
})
</script>
