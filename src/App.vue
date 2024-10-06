<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <div class="inner">
		  <img src="@/assets/logo.png" alt="Logo" class="logo" />
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
                :useCache="useCache"
              />
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
                class="box"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SignatureForm from './components/SignatureForm.vue'
import SignaturePreview from './components/SignaturePreview.vue'
import SignatureIntegrations from './components/SignatureIntegrations.vue'

export default {
  name: 'App',
  components: {
    SignatureForm,
    SignaturePreview,
    SignatureIntegrations
  },
  data() {
    return {
      useCache: window.esgConfig.useCache || true,
      companies: window.esgConfig.companies || [],
      form: {
        company: 'W4dev',
        name: '',
        jobTitle: '',
        office: '+',
        mobile: '+',
      }
    }
  }
}
</script>
