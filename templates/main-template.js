// Note that these are backticks.

const MainTemplate = `
    <div id="glossary-flashcard">
        <div class="topnav">
          <a style="height: 48px; background-color: transparent;" href="/#/"><img href="/#/" id="logo" src="/img/owp-symbol-wht.svg" class="active" /></a>
          <!-- Search Bar -->
          <div style="text-align: center; margin-top: -43px;">
            <input type="text" v-model="search" id="keywordSearch" placeholder="Search term or definition.." style="margin-bottom: 10px" class="searchbar">
          </div>

          <div :style="display_menu">

            <a @click="byCourse()">{{ menu_op1 }}</a>
            <div :style="display_courses" id="course">
              <div style="display: block; background-color: grey; padding-left: 15px">
                <a v-for="course in allcourses" href=".#/flashcard" @click="toggledNav();getTermsByCourse( course.catid )"> {{ course.coursename }} </a>
                
                <!--
                <a href=".#/flashcard" @click="toggledNav()">Water Treatment Plant Operation: Volume 1</a>
                <a>Water Treatment Plant Operation: Volume 2</a>
                <a>Small Water System Operation and Maintenance</a>
                <a>Water Distribution System Operation and Maintenance</a>
                <a>Small Wastewater System Operation and Maintenance, Volume 1</a>
                <a>Small Wastewater System Operation and Maintenance, Volume 2</a><a>Operation of Wastewater Treatment Plants, Volume 1</a>
                <a>Operation of Wastewater Treatment Plants, Volume 2</a>
                <a>Operation and Maintenance of Wastewater Collection Systems, Volume 1</a>
                <a>Operation and Maintenance of Wastewater Collection Systems, Volume 2</a>
                <a>Industrial Waste Treatment, Volume 1</a><a>Industrial Waste Treatment, Volume 2</a>
                -->
              </div>
            </div>

            <a @click="byAlpha()">{{ menu_op2 }}</a>
            <div :style="display_alpha" id="alpha">
              <div style="display: block; background-color: grey; padding-left: 15px">
              
              <div class="display_alpha">
                <div class="dropdown" v-for="letter in alphabetlinks"><a class="dropbtn" @click="toggledNav();getTermList( letter )">{{ letter }}</a></div>
                
                <!--
                <div class="dropdown"><a class="dropbtn" @click="toggledNav()" href=".#/">A</a><div id="dropdown-content"></div></div>
               -->
                </div>
              </div>
            </div>
          </div>
          <a href="javascript:void(0);" class="icon" @click="menu()">
            <i class="fa fa-bars"></i>
          </a>
        </div>
      <div id="terms-container">
        <ul style="margin:0">
            <li style="margin-bottom:15px;display:block" v-for="(term, index) in gloss" :key="index">
                <a style="font-size:13pt" @click="getDefinition( term.id );contentVisible === index ? contentVisible = false : contentVisible = index">{{ term.term }}</a>
                <transition name="slide">
                    <p style="border-bottom:1px solid #ccc" v-if='contentVisible === index'>
                        <span :id="term.id" v-if="term.definition" v-html="term.definition"></span>
                        <span :id="term.id" v-else v-html="definition"></span>
                    </p>
                </transition>
            </li>
        </ul>
      </div>

            <router-view></router-view>
        </div>
`

export { MainTemplate }