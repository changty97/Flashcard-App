// Note that these are backticks.
var MainTemplate = `
<div id="sm-scrn-navi">
      <div id="glossary-flashcard">
          <div class="topnav">
            <!-- <a class="list" style="height: 48px; background-color: transparent;" href="/#/"><img href="/#/" id="logo" src="/img/owp-symbol-wht.svg" class="logo-flashcard" /></a> -->
            <!-- Search Bar -->
            <div style="text-align: center; margin-top: -35px;">
              <img id="searchIcon" src="/img/search.svg" class="searchIcon" @click="openSearch()">
              <input type="text" v-model="search" id="keywordSearch" placeholder="Search term or definition.." style="margin-bottom: 10px;padding-top: 10px;margin-top: -35px; margin-left:10px" class="searchbar"></input>
            </div>

            <div :style="display_menu">

              <a class="list" @click="byCourse()">{{ menu_op1 }}</a>
              <div :style="display_courses" id="course">
                <div style="display: block; background-color: grey; padding-left: 15px">
                  <a class="list" v-for="course in allcourses" href=".#/flashcard" @click="toggledNav();getTermsByCourse( course.catid )"> {{ course.coursename }} </a>
                </div>
              </div>

              <a class="list" @click="byAlpha()">{{ menu_op2 }}</a>
              <div :style="display_alpha" id="alpha">
                <div style="display: block; background-color: grey; padding-left: 15px">

                <div class="display_alpha">
                  <div class="dropdown" v-for="letter in alphabetlinks"><a href=".#/flashcard" class="dropbtn list" @click="toggledNav();getTermList( letter )">{{ letter }}</a></div>
                  
              
                  </div>
                </div>
              </div>
            </div>
            <a href="javascript:void(0);" class="icon list" @click="menu()">
              <i class="fa fa-bars"></i>
            </a>
          </div>
      </div>

      <div v-for="post in filteredList">{{ post }}</div>

      <router-view></router-view>
 
  <div id="sm-scrn-navi2">
    <div id="glossary-flashcard">
      <div class="columns large-offset-1 large-10">
      <!-- raw HTML omitted -->

      <a href=".#/courses">
        <div class="flashcard_main columns large-3 medium-12 strm-panel">
          <div style="min-height: 430px;margin-top: 70px;margin-bottom: 70px;" class="thumbnail">
            <!-- <img src="/" alt="Image" width="100%"> -->
            <div class="panel-content">
              <h4>By Course</h4>
            </div>
          </div>
        </div>
      </a>

        <a href=".#/alphabetical"><div class="flashcard_main columns large-3 medium-12 strm-panel">
            <div style="min-height: 430px;margin-top: 70px;margin-bottom: 70px;" class="thumbnail">
              <!-- <img src="/" alt="Image" width="100%"> -->
              <div class="panel-content">
                  <h4>By Alphabetical</h4>
              </div>
            </div>
          </div>
        </div>
      </a>

    </div>
  </div>
  `;

export { MainTemplate }