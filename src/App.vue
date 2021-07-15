<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <div class="inner">
          <LogoFile class="logo" />
          <h1>Email Signature Generator</h1>
       </div>
      </div>
    </header>
    <main class="main">
      <div class="container">
        <div class="inner">
          <div class="form-section">
            <h2>Enter Details</h2>
            <div class="box">
              <SignatureForm 
                :companies="companies" 
                :form="form" 
              >
                <ActionButtons 
                  slot="footer" 
                  class="field field-submit" 
                  :form="form"
                  :canGenerate="canGenerate"
                  :copyHtmlBtnText="copyHtmlBtnText"
                  :copySignatureBtnText="copySignatureBtnText"
                  :copiedHtml="copiedHtml"
                  :copiedSignature="copiedSignature"
                  @copySignature="copySignature"
                  @copyHtml="copyHtml"
                />
              </SignatureForm>
              <SignatureIntegrations />
            </div>
          </div>
          <div class="preview-section">
            <div class="preview-sticky">
              <h2>Signature Preview</h2>
              <SignaturePreview 
                :companies="companies" 
                :form="form"
                ref="preview"
              />
              <ActionButtons 
                v-if="previewButtons" 
                class="preview-buttons" 
                :form="form"
                :canGenerate="canGenerate"
                :copyHtmlBtnText="copyHtmlBtnText"
                :copySignatureBtnText="copySignatureBtnText"
                :copiedHtml="copiedHtml"
                :copiedSignature="copiedSignature"
                @copySignature="copySignature"
                @copyHtml="copyHtml"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import LogoFile from './assets/logo.svg?inline'
import ActionButtons from './components/ActionButtons.vue';
import SignatureForm from './components/SignatureForm.vue'
import SignaturePreview from './components/SignaturePreview.vue'
import SignatureIntegrations from './components/SignatureIntegrations.vue'

export default {
  name: 'App',
  components: {
    LogoFile,
    ActionButtons,
    SignatureForm,
    SignaturePreview,
    SignatureIntegrations
  },
  data() {
    return {
      useCache: window.esgConfig.useCache || false,
      previewButtons: window.esgConfig.previewButtons || false,
      companies: window.esgConfig.companies || [],
      copiedHtml: false,
      copiedSignature: false,
      form: {
        company: 'AdColony',
        name: '',
        jobTitle: '',
        office: '+',
        mobile: '+',
      }
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
  },
  methods: {
    generated() {
      if (this.useCache) {
        let form = this.form;
        localStorage.setItem('form', JSON.stringify(form));
      }
    },
    copySignature: function() {
      let element = this.$refs.preview;

      if ( ! element ) {
        alert('Preview element not yet ready');
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

      this.generated();
      this.copiedSignature = true;
      setTimeout(() => { this.copiedSignature = false }, 2000)
    },
    copyHtml: function() {
      let element = this.$refs.preview;

      if ( ! element ) {
        alert('Preview element not yet ready');
        return false;
      }

      const el = document.createElement('textarea');

      el.value = element.$el.innerHTML;
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

      this.generated();
      this.copiedHtml = true;
      setTimeout(() => { this.copiedHtml = false }, 2000)
    }
  },
  mounted() {
    if (this.useCache && localStorage.getItem('form')) {
      Object.assign(this.form, JSON.parse(localStorage.getItem('form')));
    }
  }
}
</script>

<style>
@import './assets/style.css';
</style>
