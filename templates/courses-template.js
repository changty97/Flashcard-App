const CoursesTemplate = `
<div id="sm-scrn-navi3">
  <h1 style="text-align: center; padding-top:55px">Courses</h1>
    <div class="panel-content" v-for="course in allcourses">
      <div class="columns large-3 medium-12 strm-panel">
        <div style="min-height: 150px;margin-top: 50px;" class="thumbnail">
          <div class="panel-content">
            <a href=".#/flashcard" @click="getTermsByCourse(course.catid)">
              <h4> {{ course.coursename }} </h4>
              <!--<h4> {{ course.catid }} </h4>-->
            </a>
          </div>
        </div>
      </div>
    </div>
  
</div>
`

export { CoursesTemplate }