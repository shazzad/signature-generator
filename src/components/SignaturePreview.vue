<template>
  <div class="preview">
    <table cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td :width="logoWidth" :style="{'vertical-align': 'middle'}">
          <img :src="logoUrl" :width="logoWidth" :height="logoHeight" :style="{'display': 'block', 'image-rendering': '-webkit-optimize-contrast'}" />
        </td>
        <td width="49">
          <table cellspacing="0" cellpadding="0" border="0" :style="{'margin':'1.5px 0px'}">
            <tr>
              <td width="24" :height="separatorHeight" :style="{'width': '24px'}">&nbsp;</td>
              <td width="1" :height="separatorHeight" :style="{'border-left': '1px solid #d1dbe5'}"></td>
              <td width="24" :height="separatorHeight" :style="{'width': '24px'}">&nbsp;</td>
            </tr>
          </table>
        </td>
        <td>
          <table cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td :style="nameStyle">{{ name }}</td>
            </tr>
            <tr v-if="jobTitle">
              <td :style="jobTitleStyle">{{ jobTitle }}</td>
            </tr>
            <tr v-if="office || mobile">
              <td :style="{'padding': '0px 0px 4px 0px', 'font-size': fontSizeSmall, 'line-height': lineHeightSmall}">
                <table cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td v-if="office" :style="{'padding': '0px 10px 0px 0px', 'font-family' : fontFamily, 'font-weight': 500, 'font-size': fontSizeSmall, 'line-height': lineHeightSmall, 'color': colorPrimary, 'whitespace': 'nowrap'}">
                      <strong>P:</strong> {{ office }}
                    </td>
                    <td v-if="mobile" :style="{'padding': '0px', 'font-family' : fontFamily, 'font-weight': 500, 'font-size': fontSizeSmall, 'line-height': lineHeightSmall, 'color': colorPrimary, 'whitespace': 'nowrap'}">
                      <strong>M:</strong> {{ mobile }}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td :style="{'padding': '0px', 'font-size': fontSizeSmall, 'line-height': lineHeightSmall}">
                <a :href="companyUrl" :style="{'font-family' : fontFamily, 'font-weight': 700, 'color': '#4393CF', 'text-decoration': 'none'}">{{ companyUrlReadable }}</a>
              </td>
            </tr>
          </table>
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
      separatorHeight: 64,
      colorPrimary: '#002848',
      fontFamily: "Roboto, sans-serif",
      fontSizeSmall: '10px',
      lineHeightSmall: '12px',
      logoUrl: '',
      logoWidth: 0,
      logoHeight: 62
    }
  },
  mounted() {
    this.preloadCompanyLogos();
    this.parseLogo(this.companyLogo)
  },
  methods: {
    preloadCompanyLogos() {
      this.companies.forEach((com) => {
        let image = new Image();
        image.src = com.logo;
      });
    },
    parseLogo(url){
      let image = new Image();
      image.src = url;
      image.onload = (e) => {
        this.logoUrl = e.target.src
        if (e.target.height > this.logoHeight) {
          this.logoWidth = Math.round(e.target.width * ( this.logoHeight / e.target.height))
        }

        console.log(this.logoWidth)
      }
    }
  },
  watch : {
    companyLogo(nv) {
      this.parseLogo(nv)
    }
  },
  computed: {
    nameStyle() {
      return {
        'font-family' : this.fontFamily, 
        'font-weight': 700, 
        'font-size': '16px', 
        'line-height': '19px', 
        'color': this.colorPrimary, 
        'whitespace': 'nowrap', 
        'padding': '0px 0px 4px 0px'
      }
    },
    jobTitleStyle() {
      return {
        'font-family' : this.fontFamily, 
        'font-weight': 700, 
        'font-size': this.fontSizeSmall, 
        'line-height': this.lineHeightSmall, 
        'color': '#AEC0D1', 
        'whitespace': 'nowrap', 
        'padding': '0px 0px 4px 0px', 
        'text-transform': 'uppercase'
      }
    },
    company() {
      if (this.form.company) {
        return this.companies.find((c) => c.name === this.form.company)
      }
      return {name: '', url: '', logo: ''};
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
        return '';
      }

      return office
    },
    mobile() {
      let mobile = this.form.mobile.trim();
      if (mobile === '+') {
        return '';
      }

      return mobile
    }
  }
}
</script>

<style>
.preview,
.preview.box{
    padding: 20px;
}
.preview-buttons{
    margin-top: 15px;
    margin-left: 20px;
}
.preview-buttons button + button {
    margin-left: 10px;
}
@media (max-width: 919px) {
    .preview{
        display: inline-block;
    }
}
</style>