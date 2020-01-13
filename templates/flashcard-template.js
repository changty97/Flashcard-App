const FlashcardTemplate = `
                
<div id="flashcard-page">
<!-- Progress Bar and Word Count -->
    <div>
      <div>
          <div style="text-align: center; margin-top: 20px">
            <progress :max="flashCount" :value="progress"></progress>
          </div>
          <div style="text-align: center; margin-top: 10px">
            <b class="flashNum" >{{ num }}</b>
          </div>
      </div>
    </div>

    <!-- Flashcard -->
    <div id="cardBody" align="center" style="margin-top: 310px; margin-right: -720px">
      <div class="body-card">
        <label @click="cardDisplay()">
              <input type="checkbox" class="input" ref="flashcard" />
                  <div class="card">
                      <div class="front">{{ term }}</div>
                      <div class="back" v-html="definition"></div>
                  </div>
          </label>
      </div>
    </div>

      <!-- Right and left Arrows to Navigate through Words and Definitions-->
      <div class="arrow">
          <!-- <img @click="backFlashcard()" class="button" src=""> -->
          <b @click="backFlashcard()" >PREV</b>
          <!-- <img @click="changeFlashcard()" class="button" src=""> -->
          <b @click="changeFlashcard()" >NEXT</b>
      </div>

      <!-- Bottom Navigation -->
    <div class="bottom-nav container ex1">
        <div style="margin-top: 35px">
          <div class="button" style="margin-top: 30px; margin-left: 40px; margin-left: 40px">
            <img @click="shuffle()" class="button" src="">
              <div style="margin-top: 10px; margin-left: 50px">
                  <b @click="shuffle()">shuffle</b>
              </div>
          </div>

          <div class="button" style="margin-top: 30px;">
            <img @click="switches()" class="button" src="" ref="switch">
            <div style="margin-top: 10px; margin-left: 50px">
                <b @click="switches()">switch</b>
            </div>
          </div>

          <div class="button" style="margin-top: 30px;">
            <img class="button" src="">
            <div style="margin-top: 10px; margin-left: 62px">
                <b>play</b>
            </div>
          </div>
        </div>
      </div>
</div>
`

export { FlashcardTemplate }