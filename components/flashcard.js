import { FlashcardTemplate }    from "../templates/flashcard-template.js";
import { EventBus }             from "./event-bus.js"; 

const Flashcard = {
    template: FlashcardTemplate,
    data() {
        return {
          curr:         0,
          term:         null,
          terms:        [],
          defs:         [],
          num:          null,
          flashCount:   null,
          progress:     1,
          definition:   null,
          index:        0
        }
    }, 
    mounted:function()
    {
        var self                                                    = this;

        //These are the Event Bus passed from the parent component to this file (child component)
        //This event is getting the Terms for selecting by Alphabetical
        EventBus.$on("listener-letter-event", get_letter=> {  
          for(self.index = 0; self.index < get_letter.length; self.index++)
          {
            self.terms[self.index] = get_letter[self.index];
            self.term = self.terms[0];
          }
        });

        //This event is getting the Definitions for selecting by Alphabetical
        EventBus.$on("listener-letter-def-event", defsForAlpha=>  {
          for(self.index = 0; self.index < defsForAlpha.length; self.index++)
          {
            self.defs[self.index] = defsForAlpha[self.index];
            self.definition = self.defs[0];
          }
        });

        //This event is getting the Length for selecting by Alphabetical
        EventBus.$on("letterLength", letterLength=> {  
          self.flashCount = letterLength;
          self.num        = 1 + '/' + self.flashCount;
          self.curr       = 0;
      });

        //This event is getting the Terms for selecting by Course
        EventBus.$on("listener-term-event", term=>  {
          for(self.index = 0; self.index < term.length; self.index++)
          {
            self.terms[self.index] = term[self.index];
            self.term       = self.terms[0]; 
          }
        });
        
        //This event is getting the Definitions for selecting by Course
        EventBus.$on("listener-defs-event", def=>  {
          for(self.index = 0; self.index < def.length; self.index++)
          {
            self.defs[self.index] = def[self.index];
            self.definition = self.defs[0];
          }
        });

        //This event is getting the Length for selecting by Course
        EventBus.$on("courseLength", courseLength=> {  
          self.flashCount = courseLength;
          self.num        = 1 + '/' + self.flashCount;
          self.curr       = 0;
      });
    },
      methods: {
        backFlashcard: function () {
          var self                                            = this;
          if (this.curr === 0) {
            this.curr = self.flashCount - 1
          } else {
            this.curr--
          }
          //Set the term on the Flashcard
          this.term = this.terms[this.curr]      
          //Set the definition on the Flashcard     
          this.definition = this.defs[this.curr]
          
          //Set the progress bar on the Flashcard  
          this.num = this.curr + 1 + '/' + self.flashCount
          this.progress = this.curr + 1
          this.$refs.flashcard.checked = false
        },
    
        changeFlashcard: function () {
          var self                                            = this;
          if (this.curr === self.flashCount - 1) {
            this.curr = 0
          } else {
            this.curr++
          }
          //Set the term on the Flashcard
          this.term = this.terms[this.curr]   
          //Set the definition on the Flashcard       
          this.definition = this.defs[this.curr]

          //Set the progress bar on the Flashcard  
          this.num = this.curr + 1 + '/' + self.flashCount
          this.progress = this.curr + 1
          this.$refs.flashcard.checked = false
        },

        shuffle: function () {
          var self                                            = this;
          var min = 1
          var max = this.term.length
          var random = Math.floor(Math.random() * (+max - +min)) + min
          this.curr = random
          this.term = this.term[this.curr]
          this.num = 1 + '/' + self.flashCount
          this.progress = 1
        },
    
        switches: function () {
          if (this.$refs.flashcard.checked === false) {
            this.$refs.flashcard.checked = true
          } else {
            this.$refs.flashcard.checked = false
          }
        },

        cardDisplay: function() {
            if(this.$refs.flashcard.checked)
                $('.back').css('backface-visibility','visible');
            else
                $('.back').css('backface-visibility','hidden');
        }
      }
}


export { Flashcard }