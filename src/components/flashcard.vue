<template>
  <div>
      <!-- Progress Bar and Word Count -->
          <div>
            <div>
                <div style="text-align: center; margin-top: 20px">
                  <progress max="24" :value="progress"></progress>
                </div>
                <div style="text-align: center; margin-top: 10px">
                  <b class="flashNum">{{ num }}</b>
                </div>
            </div>
          </div>

          <!-- Flashcard -->
          <div id="cardBody" align="center" style="margin-top: 310px; margin-right: -720px">
            <div class="body-card">
              <label>
                    <input type="checkbox" class="input" ref="flashcard" />
                        <div class="card">
                            <div class="front">{{ term }}</div>
                            <div class="back">{{ definition }}</div>
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
</template>

<script>
export default {
  name: 'Flashcard',
  data () {
    return {
      gloss: [
        {
          word: 'Abandoned', def: 'No longer in use; a length, section, or portion of a collection system no longer in service and left in place, underground. For example, when a house or building is razed or removed, the service connection may be left open and unused.'
        },
        {
          word: 'Abatement', def: 'Putting an end to an undesirable or unlawful condition affecting the wastewater collection system. A property owner found to have inflow sources connected to the collection system may be issued a notice of abatement. Such notices will usually describe the violation, suggest corrective measures, and grant a period of time for compliance.'
        },
        {
          word: 'ABS', def: 'Alkyl Benzene Sulfonate. A type of surfactant, or surface active agent, present in synthetic detergents in the United States before 1965. ABS was especially troublesome because it caused foaming and resisted breakdown by biological treatment processes. ABS has been replaced in detergents by linear alkyl sulfonate (LAS), which is biodegradable.'
        },
        {
          word: 'Absorption', def: 'The taking in or soaking up of one substance into the body of another by molecular or chemical action (as tree roots absorb dissolved nutrients in the soil).'
        }
      ],
      curr: 0,
      term: 'Abandoned',
      definition: 'No longer in use; a length, section, or portion of a collection system no longer in service and left in place, underground. For example, when a house or building is razed or removed, the service connection may be left open and unused.',
      num: 1 + '/24',
      flashCount: '/24',
      progress: 1,
      words: [],
      search: ''
    }
  },

  created () {
    this.$http.get('https://jsonplaceholder.typicode.com/posts').then(function (data) {
      this.words = data.body.slice(0, 10)
    })
  },

  methods: {
    backFlashcard: function () {
      if (this.curr === 0) {
        this.curr = this.gloss.length - 1
      }
      else {
        this.curr--
      }
      this.term = this.gloss[this.curr].word
      this.definition = this.gloss[this.curr].def
      this.num = this.curr + 1 + '/24'
      this.progress = this.curr + 1
      this.$refs.flashcard.checked = false
    },

    changeFlashcard: function () {
      if (this.curr === this.gloss.length - 1) {
        this.curr = 0
      }
      else {
        this.curr++
      }
      this.term = this.gloss[this.curr].word
      this.definition = this.gloss[this.curr].def
      this.num = this.curr + 1 + '/24'
      this.progress = this.curr + 1
      this.$refs.flashcard.checked = false
    },

    shuffle: function () {
      var min = 1
      var max = this.gloss.length
      var random = Math.floor(Math.random() * (+max - +min)) + min
      this.curr = random
      this.term = this.gloss[this.curr].word
      this.definition = this.gloss[this.curr].def
      this.num = 1 + '/24'
      this.progress = 1
    },

    switches: function () {
      if (this.$refs.flashcard.checked === false) {
        this.$refs.flashcard.checked = true
      }
      else {
        this.$refs.flashcard.checked = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
a {
  color: #42b983;
}
</style>
