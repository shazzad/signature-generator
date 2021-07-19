<template>
  <form class="form">
    <div class="field field-select">
      <div class="field-label">Company</div>
      <div class="field-desc">Options: AdColony, Appreciate, Digital Turbine or Fyber.</div>
      <div class="field-control">
        <select v-model="form.company" autocomplete="organization">
          <option v-for="c in companies" :key="c.name" :value="c.name">{{c.name}}</option>
        </select>
      </div>
    </div>

    <div class="field field-text">
      <div class="field-label">Full Name*</div>
      <div class="field-error" v-show="nameError" v-html="nameError"></div>
      <div class="field-control">
        <input type="text" autocomplete="name" v-model="form.name" v-on:blur="nameBlured = true;" />
      </div>
    </div>

    <div class="field field-text">
      <div class="field-label">Job Title*</div>
      <div class="field-error" v-show="jobTitleError" v-html="jobTitleError"></div>
      <div class="field-control">
        <input type="text" autocomplete="organization-title" v-model="form.jobTitle" v-on:blur="jobTitleBlured = true;" />
      </div>
    </div>

    <div class="field field-text">
      <div class="field-label">Office Number</div>
      <div class="field-desc">Enter in the order of country code, area code, number. Use dashes between each section</div>
      <div class="field-error" v-show="officeError" v-html="officeError"></div>
      <div class="field-control">
        <input type="text" autocomplete="tel" v-model="form.office" v-on:blur="officeBlured = true;" />
      </div>
    </div>

    <div class="field field-text">
      <div class="field-label">Mobile Number</div>
      <div class="field-desc">Enter in the order of country code, area code, number. Use dashes between each section</div>
      <div class="field-error" v-show="mobileError" v-html="mobileError"></div>
      <div class="field-control">
        <input type="text" autocomplete="tel" v-model="form.mobile" v-on:blur="mobileBlured = true;" />
      </div>
    </div>

    <div class="field field-submit">
        <button type="button" :title="btnTitle" :disabled="formValid === false" class="btn primary-btn" @click.prevent="copySignature()">{{ copySignatureBtnText }}</button>
        <button type="button" :title="btnTitle" :disabled="formValid === false" class="btn secondary-btn" @click.prevent="copyHtml()">{{ copyHtmlBtnText }}</button>
    </div>
  </form>
</template>

<script>

export default {
  name: 'SignatureForm',
  props: [
    'companies', 
    'form',
    'useCache'
  ],
  data() {
    return {
      nameBlured: false,
      jobTitleBlured: false,
      officeBlured: false,
      mobileBlured: false,
      copiedHtml: false,
      copiedSignature: false
    }
  },
  mounted() {
    if (this.useCache && localStorage.getItem('form')) {
      Object.assign(this.form, JSON.parse(localStorage.getItem('form')));
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
      let element = this.$parent.$refs.preview;

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
      let element = this.$parent.$refs.preview;

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
  computed: {
    nameError() {
      if ( ! this.nameBlured && ! this.jobTitleBlured  && ! this.officeBlured  && ! this.mobileBlured ) {
        return '';
      }

      var value = this.form.name.trim();
      if ( ! value || value.split(' ').filter((part) => part).length < 2 ) {
        return 'Please fill in your first and last name with a space in between.';
      }

      return '';
    },
    jobTitleError() {
      if ( ! this.jobTitleBlured  && ! this.officeBlured  && ! this.mobileBlured ) {
        return '';
      }

      var value = this.form.jobTitle.trim();
      if ( ! value ) {
        return 'Please fill in your job title.';
      }

      return '';
    },
    officeError() {
      var value = this.form.office.trim();
      if ( ! value || ! this.officeBlured  && ! this.mobileBlured ) {
        return '';
      }

      var phoneNumberPattern = /^\+?[0-9-]+$/;  
      if ( phoneNumberPattern.test( value ) == false ) {
        return 'Numbers only, use dashes to separate.';
      }

      return '';
    },
    mobileError() {
      var value = this.form.mobile.trim();
      if ( ! value || ! this.mobileBlured ) {
        return '';
      }

      var phoneNumberPattern = /^\+?[0-9-]+$/;  
      if ( phoneNumberPattern.test( value ) == false ) {
        return 'Numbers only, use dashes to separate.';
      }

      return '';
    },

    btnTitle() {
      return this.formValid ? '' : 'Please fill up the form first.'
    },
    copySignatureBtnText() {
      return this.copiedSignature ? 'Copied' : 'Copy Signature'
    },
    copyHtmlBtnText() {
      return this.copiedHtml ? 'Copied' : 'Copy Html'
    },
    formValid() {
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