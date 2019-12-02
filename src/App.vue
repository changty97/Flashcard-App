<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="topnav">
          <img id="logo" src="./assets/owp-symbol-wht.svg" class="active">
          <!-- Search Bar -->
          <div style="text-align: center; margin-top: -43px;">
            <input type="text" v-model="search" id="keywordSearch" placeholder="Search term or definition.." style="margin-bottom: 10px" class="searchbar">
          </div>

          <div :style="display">
            <a href="/">{{ menu_op1 }}</a>
            <a id="course" style="display: block" @click="byCourse()">{{ menu_op2 }}</a>
            <a id="alpha" @click="byAlpha()">{{ menu_op3 }}</a>
          </div>
          <a href="javascript:void(0);" class="icon" v-on:click="menu()">
            <i class="fa fa-bars"></i>
          </a>
      </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      display: 'display: none',
      menu_op1: 'Dashboard',
      menu_op2: 'By Course',
      menu_op3: 'Alphabetical',
    }
  },
  methods: {
    menu: function () {
      if (this.display === 'display: block')
      {
        this.display = 'display: none'
      }
      else
      {
        this.display = 'display: block'
      }
    },

    byCourse: function () {
      if (document.getElementById('course'))
      {
          document.getElementById('course').outerHTML += '<div style="background-color: grey; padding-left: 15px"><a href="/#/flashcard">Water Treatment Plant Operation: Volume 1</a><a>Water Treatment Plant Operation: Volume 2</a><a>Small Water System Operation and Maintenance</a><a>Water Distribution System Operation and Maintenance</a><a>Small Wastewater System Operation and Maintenance, Volume 1</a><a>Small Wastewater System Operation and Maintenance, Volume 2</a><a>Operation of Wastewater Treatment Plants, Volume 1</a><a>Operation of Wastewater Treatment Plants, Volume 2</a><a>Operation and Maintenance of Wastewater Collection Systems, Volume 1</a><a>Operation and Maintenance of Wastewater Collection Systems, Volume 2</a><a>Industrial Waste Treatment, Volume 1</a><a>Industrial Waste Treatment, Volume 2</a></div>'
      }
    },

    byAlpha: function () {
      if (document.getElementById('alpha'))
      {
        document.getElementById('alpha').outerHTML += '<div style="background-color: grey; padding-left: 15px"><a>A</a><a>B</a><a>C</a><a>D</a><a>E</a><a>F</a><a>G</a><a>H</a><a>I</a><a>J</a><a>K</a><a>L</a><a>M</a><a>N</a><a>O</a><a>P</a><a>Q</a><a>R</a><a>S</a><a>T</a><a>U</a><a>V</a><a>W</a><a>X</a><a>Y</a><a>Z</a></div>'
      }
    },
  }
}
</script>

<style>
@import './assets/mystyle.css';
</style>