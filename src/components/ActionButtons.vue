<template>
    <div>
        <button type="button" :disabled="canGenerate === false" class="btn primary-btn" @click.prevent="copySignature()">{{ copySignatureBtnText }}</button>
        <button type="button" :disabled="canGenerate === false" class="btn secondary-btn" @click.prevent="copyHtml()">{{ copyHtmlBtnText }}</button>
    </div>
</template>

<script>
export default {
  name: 'ActionButtons',
  props: [
    'preview',
    'form'
  ],
  data() {
    return {
      copiedSignature: false,
      copiedHtml: false
    }
  },
  methods: {
    copySignature: function() {
      let element = this.preview;

      if ( typeof(element) === "undefined" ) {
        alert('Preview not yet ready');
        return false;
      }

      if (document.body.createTextRange) {
        let range = document.body.createTextRange();
        range.moveToElementText(element.$el);
        range.select();
        document.execCommand('copy');

      } else if (window.getSelection) {
        let selection = window.getSelection();        
        let range = document.createRange();
        range.selectNodeContents(element.$el);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
      }

      this.$emit('generated');
      this.copiedSignature = true;
      setTimeout(() => { this.copiedSignature = false }, 2000)
    },
    copyHtml: function() {
      const el = document.createElement('textarea');

      el.value = this.preview.innerHTML;
      console.log(el.value);
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);

      const selected =  document.getSelection().rangeCount > 0  ? document.getSelection().getRangeAt(0) : false;                                    
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }

      this.$emit('generated');
      this.copiedHtml = true;
      setTimeout(() => { this.copiedHtml = false }, 2000)
    }
  },
  computed: {
    copySignatureBtnText() {
      return this.copiedSignature ? 'Copied' : 'Copy Signature'
    },
    copyHtmlBtnText() {
      return this.copiedHtml ? 'Copied' : 'Copy Html'
    },
    canGenerate() {
      if ( ! this.form.name) {
        return false;
      }

      if ( this.form.name.split(' ').filter((part) => part).length <= 1 ) {
        return false;
      }

      if ( ! this.form.jobTitle.trim() ) {
        return false;
      }

      return true;
    }
  }
}
</script>