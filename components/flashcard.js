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
          index:        0,
          regex:        /(<([^>]+)>)/ig,
          result:       null
        }
    }, 
    mounted:function()
    {
      var self                                                    = this;

      //---------------//
      //Mobile VERSION 
      //---------------//
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
          self.result = defsForAlpha[self.index].replace(self.regex, "");
          self.defs[self.index] = self.result;
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
          self.result = def[self.index].replace(self.regex, "");
          self.defs[self.index] = self.result;
          self.definition = self.defs[0];
        } 
      });

      //This event is getting the Length for selecting by Course
      EventBus.$on("courseLength", courseLength=> {  
        self.flashCount = courseLength;
        self.num        = 1 + '/' + self.flashCount;
        self.curr       = 0;
      });

      //---------------//
      //DESKTOP VERSION 
      //---------------//
      //This event is getting the Terms for selecting by Course 
      EventBus.$on("listener-term-desk", term=>  {
        for(self.index = 0; self.index < term.length; self.index++)
        {
          self.terms[self.index] = term[self.index];
          self.term       = self.terms[0]; 
        }
      });
      
      //This event is getting the Definitions for selecting by Course
      EventBus.$on("listener-defs-desk", def=>  {
        for(self.index = 0; self.index < def.length; self.index++)
        {
          self.defs[self.index] = def[self.index];
          self.definition = self.defs[0];
        }
      });

      //This event is getting the Length for selecting by Course
      EventBus.$on("courseLength-desk", courseLength=> {  
        self.flashCount = courseLength;
        self.num        = 1 + '/' + self.flashCount;
        self.curr       = 0;
    });

    //This event is getting the Terms for selecting by Alphabetical
    EventBus.$on("listener-letter-desk", get_letter=> {  
      for(self.index = 0; self.index < get_letter.length; self.index++)
      {
        self.terms[self.index] = get_letter[self.index];
        self.term = self.terms[0];
      }
    });

    //This event is getting the Definitions for selecting by Alphabetical
    EventBus.$on("listener-letter-def-desk", defsForAlpha=>  {
      for(self.index = 0; self.index < defsForAlpha.length; self.index++)
      {
        self.defs[self.index] = defsForAlpha[self.index];
        self.definition = self.defs[0];
      }
    });

    //This event is getting the Length for selecting by Alphabetical
    EventBus.$on("letterLength-desk", letterLength=> {  
      self.flashCount = letterLength;
      self.num        = 1 + '/' + self.flashCount;
      self.curr       = 0;
    });

        //Do not display the main page (parent page) to choose "by Course" or "by Alphabetical"
        if(window.location.href == 'http://localhost:1313/operator-training/flashcard/#/flashcard')
        {
          if($('#sm-scrn-navi2'))
          {
            $('#sm-scrn-navi2').css('display', 'none');
          }
        }
    },
      methods: {
        backFlashcard: function () {
          var self                                            = this;
          if (self.curr === 0) {
            self.curr = self.flashCount - 1
          } else {
            self.curr--
          }
          //Set the term on the Flashcard
          self.term = self.terms[self.curr]      
          //Set the definition on the Flashcard     
          self.definition = self.defs[self.curr]
          
          //Set the progress bar on the Flashcard  
          self.num = self.curr + 1 + '/' + self.flashCount
          self.progress = this.curr + 1
          self.$refs.flashcard.checked = false
        },
    
        changeFlashcard: function () {
          var self                                            = this;
          if (self.curr === self.flashCount - 1) {
            self.curr = 0
          } else {
            self.curr++
          }
          //Set the term on the Flashcard
          self.term = self.terms[self.curr]   
          //Set the definition on the Flashcard       
          self.definition = self.defs[self.curr]

          //Set the progress bar on the Flashcard (Default)
            self.num = self.curr + 1 + '/' + self.flashCount
            self.progress = self.curr + 1
            self.$refs.flashcard.checked = false
        },

        shuffle: function () {
          var self                                            = this;
          var min = 1
          var max = self.terms.length
          var random = Math.floor(Math.random() * (+max - +min)) + min
          self.curr = random
          self.term = self.terms[self.curr]
          self.definition = self.defs[self.curr]
          self.num = 1 + '/' + self.flashCount
          self.progress = 1
          console.log(self.progress)
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