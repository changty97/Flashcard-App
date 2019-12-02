<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="topnav">
          <img id="logo" src="./assets/owp-symbol-wht.svg" class="active">
          <!-- Search Bar -->
          <div style="text-align: center; margin-top: -43px;">
            <input type="text" v-model="search" id="keywordSearch" placeholder="Search term or definition.." style="margin-bottom: 10px" class="searchbar">
          </div>

          <div :style="display_menu">
            <a href="/">{{ menu_op1 }}</a>
            <a @click="byCourse()">{{ menu_op2 }}</a>
            <div :style="display_courses" id="course"></div>
            <a @click="byAlpha()">{{ menu_op3 }}</a>
            <div :style="display_alpha" id="alpha"></div>
          </div>
          <a href="javascript:void(0);" class="icon" @click="menu()">
            <i class="fa fa-bars"></i>
          </a>
      </div>
      <!-- <div id="selection">
         <center>
            <h1>Select from the following:</h1><br>
            <button @click="byCourse()">{{ menu_op2 }}</button>
            <div :style="display_courses" id="course"></div><br>
            <button id="alpha" @click="byAlpha()">{{ menu_op3 }}</button>
            <div :style="display_alpha" id="alpha"></div>
         </center>
      </div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      display_menu: 'display: none',
      display_courses: 'display: none',
      display_alpha: 'display: none',
      menu_op1: 'Dashboard',
      menu_op2: 'By Course',
      menu_op3: 'By Alphabetical'
    }
  },
  methods: {
    menu: function () {
      if (this.display_menu === 'display: block')
      {
        this.display_menu = 'display: none'
      }
      else
      {
        this.display_menu = 'display: block'
      }
    },

    byCourse: function () {
      if (this.display_courses === 'display: block')
      {
        this.display_courses = 'display: none'
      }
      else
      {
        this.display_courses = 'display: block'
         document.getElementById('course').innerHTML = '<div style="display: block; background-color: grey; padding-left: 15px"><a href="/#/flashcard/courses/water-treatment-plant-operation-v1/">Water Treatment Plant Operation: Volume 1</a><a>Water Treatment Plant Operation: Volume 2</a><a>Small Water System Operation and Maintenance</a><a>Water Distribution System Operation and Maintenance</a><a>Small Wastewater System Operation and Maintenance, Volume 1</a><a>Small Wastewater System Operation and Maintenance, Volume 2</a><a>Operation of Wastewater Treatment Plants, Volume 1</a><a>Operation of Wastewater Treatment Plants, Volume 2</a><a>Operation and Maintenance of Wastewater Collection Systems, Volume 1</a><a>Operation and Maintenance of Wastewater Collection Systems, Volume 2</a><a>Industrial Waste Treatment, Volume 1</a><a>Industrial Waste Treatment, Volume 2</a></div>'
      }
    },

    byAlpha: function () {
      if (this.display_alpha === 'display: block')
      {
        this.display_alpha = 'display: none'
      }
      else
      {
        this.display_alpha = 'display: block'
         document.getElementById('alpha').innerHTML = '<div style="background-color: grey; padding-left: 15px"><a href="/#/flashcard/alphabetical/A/">A</a><a>B</a><a>C</a><a>D</a><a>E</a><a>F</a><a>G</a><a>H</a><a>I</a><a>J</a><a>K</a><a>L</a><a>M</a><a>N</a><a>O</a><a>P</a><a>Q</a><a>R</a><a>S</a><a>T</a><a>U</a><a>V</a><a>W</a><a>X</a><a>Y</a><a>Z</a></div>'
      }
    }
  }
}
</script>

<style>
@import './assets/mystyle.css';
</style>
