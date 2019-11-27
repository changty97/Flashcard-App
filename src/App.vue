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
<title>vue-routes-01</title>
<script type="text/javascript" src="glossorydev.json"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

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
          document.getElementById('course').outerHTML += '<div id="courseTitles" style="display: block; background-color: grey; padding-left: 15px"><a>Water 1</a><a>Water 2</a><a>Small Water</a><a>Water Distribution</a><a>Small Wastewater Systems 1</a><a>Small Wastewater Systems 2</a><a>Wastewater 1</a><a>Wastewater 2</a><a>Collections 1</a><a>Collections 2</a><a>Industrial Waste Treatment 1</a><a>Industrial Waste Treatment 2</a></div>'
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
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

.mobile-container {
  background-color: #f0f0f0;
  margin: 0px auto;
}

.responsive {
  max-width: 500px;
  margin: auto;
}

.container {
  height: 150px;
}

.searchbar {
  padding: 6px 10px;
  background: white;
  font-size: 17px;
  border: none;
  cursor: pointer;
}

div.ex1 {
  max-width:550px;
  margin: auto;
  box-shadow: 0px 8px 16px 0px #666;
}

.dropdown {
  position: relative;
  display: inline-block;
  padding: 5px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: gray;
  min-width: 160px;
  border-radius: 2px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  border-radius: 2px;
  background-color: #333;
  color: white;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: white;
  border-radius: 2px;
  /* border: 1px solid #333; */
  box-shadow: 0px 0px 2px 0px #666;
  padding: 5px;
  width: 20px;
  height: 50px;
}

.bottom-nav {
  background: #FFF;
}

.topnav {
  overflow: hidden;
  background-color: #333;
  position: relative;
}

.topnav #myLinks {
  display: none;
}

.topnav a {
  color: white;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: block;
}

.topnav a.icon {
  background: black;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
  display: block;
}

.active {
  width: 125px;
  height: 45px;
}

.arrow {
  text-align: center;
  margin-top: -250px;
  margin-bottom: 25px;
}

.button {
  width: 65px;
  vertical-align: top;
  display: inline-block;
  margin-left: 45px;
  margin-right: 45px;
}

.button:hover {
  filter: invert(50%);
}

progress[value]{
  -webkit-appearance: none;
  width: 250px;
  height: 20px;
  border-radius: 2px;
  box-shadow: 0px 0px 2px 0px #666;
}

::-webkit-progress-bar {
  background-color: white;
}

.btn {
  height: 250px;
  width: 500px;
  margin: 10px;
  padding: 15px 25px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
  white-space: normal;
  word-wrap: break-word;
}

@import url(https://fonts.googleapis.com/css?family=Open+Sans);

.body-card {
  font-family: Open Sans;
  font-size: 30px;
  color: #222;
  width: 100%;
}

label {
  -webkit-perspective: 1000px;
  perspective: 1000px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  display: inline-block;
  width: 725px;
  height: 580px;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  cursor: pointer;
  vertical-align: top;
}

.card {
  position: relative;
  height: 100%;
  width: 100%;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transition: all 600ms;
  transition: all 600ms;
  z-index: 20;
  display: inline-block;
}

.card div {
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 5px;
  padding-left: 10px;
  margin-left: -6px;
  margin-top: -5px;
  background: #FFF;
  text-align: center;
  line-height: 200px;
  backface-visibility: hidden;
  border-radius: 2px;
  box-shadow: 5px 5px 10px #666;
}

.card .back {
  background: #222;
  text-align: left;
  margin-left: -6px;
  margin-top: -5px;
  padding: 5px;
  padding-left: 10px;
  color: #FFF;
  font-size: 16px;
  -webkit-transform: rotateX(180deg);
  transform: rotateX(180deg);
  line-height: 20px;
}

label:hover .card {
  -webkit-transform: rotateX(20deg);
  transform: rotateX(20deg);
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.918);
}

.input {
  display: none;
}

:checked + .card {
  transform: rotateX(180deg);
  -webkit-transform: rotateX(180deg);
}

label:hover :checked + .card {
  transform: rotateX(160deg);
  -webkit-transform: rotateX(160deg);
  box-shadow: 0 20px 20px rgba(255,255,255,.2);
}

.grid {
  widows: 200px;
  height: 200px;
  display: inline-block;
  margin: 4px;
}

.flashNum {
  color: black;
}

.smallLogo {
  /* background-image: url(./asset/image/owp-symbol-wht); */
  height: 45px;
}

@media screen and (max-width: 770px) {
  .active {
    width: 90px;
  }
  
  label {
    width: 525px;
    margin-right: 200px;
  }
}

@media screen and (max-width: 470px) {
  .active {
    width: 70px;
  }

  label {
    width: 325px;
    margin-right: 400px;
  }
}
</style>
