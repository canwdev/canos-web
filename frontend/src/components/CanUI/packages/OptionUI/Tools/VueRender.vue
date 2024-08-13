<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'VueRender',
  props: {
    renderFn: {
      type: [Object, Function],
      required: true,
    },
    params: null,
  },
  render(props) {
    if (typeof this.renderFn === 'function') {
      return this.renderFn(props.params)
    }
    return this.renderFn
  },
})
</script>
