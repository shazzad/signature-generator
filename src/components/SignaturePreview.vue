<template>
  <div class="box preview">
    <table :style="{ 'table-layout': 'fixed' }" cellspacing="0" cellpadding="0">
      <tr>
        <td :style="{'vertical-align': 'middle'}">
          <img :src="companyLogo" :style="{'max-width': '250px', 'height': logoHeight + 'px', 'width': 'auto', 'display': 'block', 'image-rendering': '-webkit-optimize-contrast'}" />
        </td>
        <td width="49">
          <span :style="{'display': 'block', 'width': '1px', 'height': height + 'px', 'margin': 'auto 24px', 'background-color': '#d1dbe5'}">&nbsp;</span>
        </td>
        <td>
          <h1 v-if="name" :style="{'font-family' : fontFamily, 'font-weight': 700, 'font-size': '16px', 'line-height': '19px', 'color': colorPrimary, 'margin': '0px 0px 4px 0px','padding': '0px', 'whitespace': 'nowrap'}">{{ name }}</h1>
          <p v-if="jobTitle" :style="{'font-family' : fontFamily, 'font-weight': 700, 'font-size': fontSizeSmall, 'line-height': lineHeightSmall, 'color': '#AEC0D1', 'text-transform': 'uppercase', 'margin': '0px 0px 4px 0px','padding': '0px'}">{{ jobTitle }}</p>
          <p v-if="office || mobile" :style="{'margin': '0px 0px 4px','padding': '0px', 'font-size': fontSizeSmall, 'line-height': lineHeightSmall}">
            <span v-show="office">
              <span :style="{'font-family' : fontFamily, 'font-weight': 700, 'font-size': fontSizeSmall, 'line-height': lineHeightSmall, 'color': colorPrimary}">P: </span>
              <span :style="{'font-family' : fontFamily, 'font-weight': 500, 'font-size': fontSizeSmall, 'line-height': lineHeightSmall, 'color': colorPrimary}">{{ office }}</span>
            </span>
            <span v-if="office" width="10">&nbsp;</span>
            <span v-show="mobile">
              <span :style="{'font-family' : fontFamily, 'font-weight': 700, 'font-size': fontSizeSmall, 'line-height': lineHeightSmall, 'color': colorPrimary}">M: </span>
              <span :style="{'font-family' : fontFamily, 'font-weight': 500, 'font-size': fontSizeSmall, 'line-height': lineHeightSmall, 'color': colorPrimary}">{{ mobile }}</span>
            </span>
          </p>
          <p :style="{'margin': '0px','padding': '0px', 'font-size': fontSizeSmall, 'line-height': lineHeightSmall}">
            <a :href="companyUrl" :style="{'font-family' : fontFamily, 'font-weight': 700, 'font-size': fontSizeSmall, 'line-height': lineHeightSmall, 'color': '#4393CF', 'text-decoration': 'none'}">{{ companyUrlReadable }}</a>
          </p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'SignaturePreview',
  props: ['companies', 'form'],
  data() {
    return {
      height: 64,
      logoHeight: 62,
      colorPrimary: '#002848',
      fontFamily: "Roboto, sans-serif",
      fontSizeSmall: '10px',
      lineHeightSmall: '12px'
    }
  },
  mounted() {
    this.preloadCompanyLogos();
  },
  methods: {
    preloadCompanyLogos() {
      this.companies.forEach((com) => {
        let image = new Image();
        image.src = com.logo;
      });
    }
  },
  computed: {
    company() {
      if (this.form.company) {
        return this.companies.find((c) => c.name === this.form.company)
      }
      return {name: '', url: ''};
    },
    companyLogo() {
      return this.company.logo
    },
    companyUrl() {
      return this.company.url;
    },
    companyUrlReadable() {
      return this.companyUrl.replace(/(^\w+:|^)\/\//, '');
    },
    name() {
      if ( ! this.form.name.trim()) {
        return 'First Last';
      }

      return this.form.name.trim();
    },
    jobTitle() {
      if (! this.form.jobTitle) {
        return 'Job Title';
      }

      return this.form.jobTitle.trim();
    },
    office() {
      let office = this.form.office.trim();
      if (office === '+') {
        return '+1-888-888-888';
      }

      return office
    },
    mobile() {
      let mobile = this.form.mobile.trim();
      if (mobile === '+') {
        return '+1-888-888-888';
      }

      return mobile
    }
  }
}
</script>
