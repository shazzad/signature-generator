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
        <input type="text" autocomplete="name" v-model="form.name" />
      </div>
    </div>

    <div class="field field-text">
      <div class="field-label">Job Title*</div>
      <div class="field-error" v-show="jobTitleError" v-html="jobTitleError"></div>
      <div class="field-control">
        <input type="text" autocomplete="organization-title" v-model="form.jobTitle" />
      </div>
    </div>

    <div class="field field-text">
      <div class="field-label">Office Number</div>
      <div class="field-desc">Enter in the order of country code, area code, number. Use dashes between each section</div>
      <div class="field-error" v-show="officeError" v-html="officeError"></div>
      <div class="field-control">
        <input type="text" autocomplete="tel" v-model="form.office" />
      </div>
    </div>

    <div class="field field-text">
      <div class="field-label">Mobile Number</div>
      <div class="field-desc">Enter in the order of country code, area code, number. Use dashes between each section</div>
      <div class="field-error" v-show="mobileError" v-html="mobileError"></div>
      <div class="field-control">
        <input type="text" autocomplete="tel" v-model="form.mobile" />
      </div>
    </div>
    <slot name="footer"></slot>
  </form>
</template>

<script>

export default {
  name: 'SignatureForm',
  props: [
    'companies', 
    'form',
    'preview'
  ],
  computed: {
    nameError() {
      if ( ! this.form.name) {
        return '';
      }

      if ( this.form.name.split(' ').filter((part) => part).length > 1 ) {
        return '';
      }

      return 'Please fill in your first and last name with a space in between.';
    },
    jobTitleError() {
      if ( ! this.form.jobTitle.trim()) {
        return 'Please fill in your job title.';
      }

      return '';
    },
    officeError() {
      if ( ! this.form.office.trim() || this.form.office.trim().indexOf(' ') == -1) {
        return '';
      }

      return 'Numbers only, use dashes to separate.';
    },
    mobileError() {
      if ( ! this.form.mobile.trim() || this.form.mobile.trim().indexOf(' ') == -1) {
        return '';
      }

      return 'Numbers only, use dashes to separate.';
    }
  }
}
</script>