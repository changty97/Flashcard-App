<template>
  <div id="app">
        <div class="topnav">
            <img src="./assets/OWP-Short-SacState-Logo-White.svg" class="active">
            <div :style="display">
              <a href="dashboard.html">{{ menu_op1 }}</a>
              <a href="#Help">{{ menu_op2 }}</a>
            </div>
            <a href="javascript:void(0);" class="icon" @click="menu()">
              <i class="fa fa-bars"></i>
            </a>
        </div>
        
            <div>
              <div>
                  <progress max="24" :value="progress"></progress>
                  <b class="flashNum">{{ num }}</b>
              </div>

              <div class="body-card">
                <label>
                      <input type="checkbox" class="input" />
                          <div class="card">
                              <div ref="flashcard_front" class="front">{{ message }}</div>
                              <div ref="flashcard_back" class="back">{{ text }}</div>
                          </div>
                  </label> 
              </div>
              
              <div style="margin-left: 30px; margin-top: -55px;">
                  <img @click="backFlashcard()" class="arrow-left" src="./assets/arrow-circle-left-solid.svg">
                  <img @click="changeFlashcard()" class="arrow-right" src="./assets/arrow-circle-right-solid.svg">
              </div>

            </div> 
  </div>
</template>

<script>
  new Vue({
      el: '#app',
      data: { 
        gloss: [
          { word: "Abandoned", def: "No longer in use; a length, section, or portion of a collection system no longer in service and left in place, underground. For example, when a house or building is razed or removed, the service connection may be left open and unused." },
          { word: "Abatement", def: "Putting an end to an undesirable or unlawful condition affecting the wastewater collection system. A property owner found to have inflow sources connected to the collection system may be issued a notice of abatement. Such notices will usually describe the violation, suggest corrective measures, and grant a period of time for compliance." },
          { word: "ABS", def: "Alkyl Benzene Sulfonate. A type of surfactant, or surface active agent, present in synthetic detergents in the United States before 1965. ABS was especially troublesome because it caused foaming and resisted breakdown by biological treatment processes. ABS has been replaced in detergents by linear alkyl sulfonate (LAS), which is biodegradable." },
          { word: "Absorption", def: "The taking in or soaking up of one substance into the body of another by molecular or chemical action (as tree roots absorb dissolved nutrients in the soil)." }
        ],
        message: "Abandoned",
        text: "No longer in use; a length, section, or portion of a collection system no longer in service and left in place, underground. For example, when a house or building is razed or removed, the service connection may be left open and unused.",
        curr: 0,
        num: 1 + "/24",
        flashCount: "/24",
        progress: 1,
        word: "Abandoned",  
        display: "display: none",
        menu_op1: "Dashboard",
        menu_op2: "Help"    
      },
      
      computed: {
        words() {
          return data.glossary.map((item) => {
            return item.word;
          })
        }
      },

      methods:{
            menu: function() {
              if(this.display == "display: block") 
              {
                this.display = "display: none";
              }
              else
              {
                this.display = "display: block";
              }
            },

            backFlashcard: function () {
            	if(this.curr == 0){
              	this.curr = this.gloss.length - 1;
              }
              else {
               this.curr--;
              }
                this.message =  this.gloss[this.curr].word;   
                this.text = this.gloss[this.curr].def;
                this.num = this.curr + 1 + "/24";
                this.progress = this.curr + 1;
            },
            
            changeFlashcard: function(){
            	if(this.curr == this.gloss.length - 1){
              	this.curr = 0;
              }
              else {
               this.curr++;
              }
                this.message =  this.gloss[this.curr].word;  
                this.text = this.gloss[this.curr].def;
                this.num = this.curr + 1 + "/24";
                this.progress = this.curr + 1;
            }
      }
    });
</script>
