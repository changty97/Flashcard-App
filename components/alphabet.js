import { AlphaTemplate }      from "../templates/alphabet-template.js";
import { EventBus }           from "./event-bus.js"; 

const Alphabetical = {
    template: AlphaTemplate,
    data() {
        return {
          index:            0,
          alphabetlinks:    null,
          firstLetter:      null,
          gloss:            null,
          get_letter:       [],
          defsForAlpha:     [],
          regex:            /(<([^>]+)>)/ig
        }
    },
    mounted:function()
    {
        var self                                                    = this;
        
        //Reloads to load the data onto the Alphabet page
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
        EventBus.$on("first_letter_event", getFirstLetter=> {  
          self.alphabetlinks = getFirstLetter;
        });

        //Do not display the main page (parent page) to choose "by Course" or "by Alphabetical"
        if(window.location.href == 'http://localhost:1313/operator-training/flashcard/#/alphabetical')
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
      getTermList(firstLetter)
      {   
        console.log(firstLetter)
          if(firstLetter)
          {
              var self                                            = this;
              $.when( getData('glossary/terms/'+firstLetter) ).then(function( d, textStatus, jqXHR ) 
              {
                  if(d.response.length > 0)
                  {
                      self.gloss                                  = d.response;

                      //This Event Bus is to pass the first letter (terms) to the child component in this case \flashcard.js  using the variable listener-letter-event
                      for(self.index = 0; self.index < self.gloss.length; self.index++)
                      {
                        self.get_letter[self.index] = self.gloss[self.index].term;
                        self.getDefinition(self.gloss[self.index].id);
                      }
                      EventBus.$emit("listener-letter-desk", self.get_letter);
                      EventBus.$emit("letterLength-desk", self.gloss.length);
                  }
                  else
                      console.log('Query failed to return a term. The database may be down. Please comeback at a later time.');
              }, function(response)
              {
                  console.log(response);
              });
          }
      },
      getDefinition(tid)
      {
          if(tid)
          {
              var self                                            = this;
              $.when( getData('glossary/term/'+tid) ).then(function( data, textStatus, jqXHR ) 
              {
                  if(data.response){
                      self.def                             = data.response;
                      //This results is parsing all the HTML tags out of the Definitions
                      var result = self.def.replace(self.regex, "");
                      self.defsForAlpha.push(result);

                      //This Event Bus is to pass the definitions to the child component in this case \flashcard.js  using the variable listener-letter-def-event
                      EventBus.$emit("listener-letter-def-desk", self.defsForAlpha); 
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

export { Alphabetical }