import { CoursesTemplate }    from "../templates/courses-template.js";
import { EventBus }           from "./event-bus.js"; 

const Courses = {
    template: CoursesTemplate,
    data() {
        return {
          index:            0,
          catid:            0,
          allcourses:       null
        }
    },
    mounted:function()
    {
        var self                                                    = this;

       //These are the Event Bus passed from the parent component to this file (child component)
        //This event is getting the Terms for selecting by Alphabetical
        EventBus.$on("listener-course", getCourse=> {  
          self.allcourses = getCourse;
          for(var i = 0; i < getCourse.length; i++)
          {
            self.catid = getCourse[i].catid;
            console.log(getCourse[i].catid)
          }
        });

        // console.log(self.catid);
        if(window.location.href == 'http://localhost:1313/operator-training/flashcard/#/courses')
        {
          if(document.getElementById('sm-scrn-navi2'))
          {
            document.getElementById('sm-scrn-navi2').style.display = 'none';
          }
        }
        

    },
    methods: {
      getTermsByCourse(cid)
      {
        if(cid)
        {
            var self                                            = this;
            self.contentVisible                                 = false;
            $.when( getData('glossary/getTermsByCat/'+cid) ).then(function( data, textStatus, jqXHR ) 
            {
                if(data.response) {
                    self.gloss                                  = data.response;

                    //This Event Bus is to pass the terms and definitions by category to the child component in this case \flashcard.js 
                    for(self.index = 0; self.index < self.gloss.length; self.index++)
                    {
                      self.term[self.index] = self.gloss[self.index].term;
                      self.definition[self.index] = self.gloss[self.index].definition;
                    }
                    EventBus.$emit("listener-term-event", self.term);
                    EventBus.$emit("listener-defs-event", self.definition);
                    EventBus.$emit("courseLength", self.gloss.length);
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