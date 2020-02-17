import { AlphaTemplate }      from "../templates/alphabet-template.js";
import { EventBus }           from "./event-bus.js"; 

const Alphabetical = {
    template: AlphaTemplate,
    data() {
        return {
          index:            0,
          alphabetlinks:    null,
          firstLetter:      null    
        }
    },
    mounted:function()
    {
        var self                                                    = this;

       //These are the Event Bus passed from the parent component to this file (child component)
        //This event is getting the Terms for selecting by Alphabetical
        EventBus.$on("first_letter_event", getFirstLetter=> {  
          self.alphabetlinks = getFirstLetter;
        });

        // console.log(self.catid);
        if(window.location.href == 'http://localhost:1313/operator-training/flashcard/#/alphabetical')
        {
          if(document.getElementById('sm-scrn-navi2'))
          {
            document.getElementById('sm-scrn-navi2').style.display = 'none';
          }
        }
        

    },
    methods: {
      
    }
}

export { Alphabetical }