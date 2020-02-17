const AlphaTemplate = `
<div id="sm-scrn-navi3">
  <h1 style="text-align: center; padding-top:55px">Alphabetical</h1>
    <div class="panel-content" v-for="letter in alphabetlinks">
      <div class="columns large-3 medium-12 strm-panel">
        <div style="min-height: 150px;margin-top: 50px;" class="thumbnail">
          <div class="panel-content">
            <a href=".#/flashcard" @click="">
              <h4> {{ letter }} </h4>
            </a>
          </div>
        </div>
      </div>
    </div>
  
</div>
`

export { AlphaTemplate }