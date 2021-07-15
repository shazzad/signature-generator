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
                <ActionButtons slot="footer" class="field field-submit" :preview="$refs.preview" :form="form" @generated="generated()" />
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
              <ActionButtons v-if="previewButtons" class="preview-buttons" :preview="$refs.preview" :form="form" @generated="generated()" />
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
      form: {
        company: 'AdColony',
        name: '',
        jobTitle: '',
        office: '+',
        mobile: '+',
      }
    }
  },
  methods: {
    generated() {
      if (this.useCache) {
        let form = this.form;
        localStorage.setItem('form', JSON.stringify(form));
      }
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
