<template>
    <div>
        <button type="button" :title="title" :disabled="canGenerate === false" class="btn primary-btn" @click.prevent="$emit('copySignature')">{{ copySignatureBtnText }}</button>
        <button type="button" :title="title" :disabled="canGenerate === false" class="btn secondary-btn" @click.prevent="$emit('copyHtml')">{{ copyHtmlBtnText }}</button>
    </div>
</template>

<script>
export default {
  name: 'ActionButtons',
  props: [
    'form',
    'copiedSignature',
    'copiedHtml',
    'copySignatureBtnText',
    'copyHtmlBtnText',
    'canGenerate'
  ],
  computed: {
    title() {
      return this.canGenerate ? '' : 'Please fill up the form first.'
    }
  }
}
</script>