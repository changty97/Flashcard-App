import { CoursesTemplate }                                  from "../templates/courses-template.js";
import { EventBus }                                         from "./event-bus.js"; 
import { data , gloss, allcourses, alphabetlinks, def }     from './data.js';

const Courses = {
    template: CoursesTemplate,
    data() {
        return {
          index:            0,
          allcourses:       null,
          gloss:            null,
          term:             [],
          definition:       [],
          regex:            /(<([^>]+)>)/ig
        }
    },
    mounted:function()
    {
        var self                                                    = this;
        
        //Reloads to load the data onto the Courses page
        if (localStorage.getItem('reloaded')) {
          // The page was just reloaded. Clear the value from local storage
          // so that it will reload the next time this page is visited.
          localStorage.removeItem('reloaded');
        } else {
          // Set a flag so that we know not to reload the page twice.
          localStorage.setItem('reloaded', '1');
          location.reload();
        }

       //These are the Event Bus passed from the parent component to this file (child component)
        //This event is getting the Terms for selecting by Alphabetical
        EventBus.$on("listener-course", getCourse=> {  
          self.allcourses = getCourse;
        });
        
        //Do not display the main page (parent page) to choose "by Course" or "by Alphabetical"
        if(window.location.href == 'http://localhost:1313/operator-training/flashcard/#/courses')
        {
          if($('#sm-scrn-navi2'))
          {
            $('#sm-scrn-navi2').css('display', 'none');
          }

          //If the user clicks back to the home page reload home page
          window.onhashchange =function()
          {
            if(window.location.href == 'http://localhost:1313/operator-training/flashcard/#/')
            {
              this.location.replace('http://localhost:1313/operator-training/flashcard/#/');
              location.reload();
            }
          }
        }
    },
    methods: {
      getTermsByCourse(cid)
      {
        if(cid)
        {
            var self                                            = this;
            $.when( getData('glossary/getTermsByCat/'+cid) ).then(function( data, textStatus, jqXHR ) 
            {
                if(data.response) {
                   self.gloss                                  = data.response;

                    //This Event Bus is to pass the terms, definitions, and glossary length by category to the flashcard component (for Desktop)
                    for(self.index = 0; self.index < self.gloss.length; self.index++)
                    {
                      self.term[self.index] = self.gloss[self.index].term;
                      var result = self.gloss[self.index].definition.replace(self.regex, "");
                      self.definition[self.index] = result;
                    }
                    EventBus.$emit("listener-term-desk", self.term);
                    EventBus.$emit("listener-defs-desk", self.definition);
                    EventBus.$emit("courseLength-desk", self.gloss.length);
                  }
                else
                    console.log('Query failed to return a term. The database may be down. Please comeback at a later time.');
            }, function(response)
            {
                console.log(response);
            });
        }
      }
    }
}

export { Courses }