import Vue from 'https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.esm.browser.min.js'
import { EventBus } from "./components/event-bus.js"; 

//import templates
import {
    MainTemplate
} from './templates/main-template.js'

//import components
import { Flashcard } from './components/flashcard.js'
import { Courses } from './components/courses.js'
import { Alphabetical } from './components/alphabet.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: 
  [
    { path: '/flashcard', component: Flashcard },
    { path: '/courses', component: Courses },
    { path: '/alphabetical', component: Alphabetical }
  ]
})

if(document.getElementById("flashcard-app"))
{
  new Vue({
    el:                     '#flashcard-app', // This should be the same as your <div id=""> from earlier.
    router,
    components: {  
      Flashcard
    },
    template:               MainTemplate,
    data: {
        gloss:              null, //This one is grabbing data from the database
        display_menu:       'display: none',
        display_courses:    'display: none',
        display_alpha:      'display: none',
        menu_op1:           'By Course',
        menu_op2:           'By Alphabetical',
        search:             '',
        allcourses:         null,
        alphabetlinks:      null,
        def:                null, //This one is grabbing data from the database
        definition:         [],
        get_letter:         [],
        term:               [],
        defsForAlpha:       [],
        // courses:            [],
        index:              0
    },
    mounted:function()
    {
        var self                                                    = this;
        self.getAllCourses();
        self.getGlossaryLetterIndex();
    },
    created() {
      window.addEventListener('search', this.openSearch);
      this.openSearch();
    },
    destroyed() {
      window.removeEventListener('search', this.openSearch);
    },
    computed: {
      filteredList() {
        return this.term.filter(post => {
          return post.title.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    methods: {
      menu: function () {
        if (this.display_menu === 'display: block')
        {
          this.display_menu = 'display: none'
        }
        else
        {
          this.display_menu = 'display: block'
        }
      },
  
      byCourse: function () {
        if (this.display_courses === 'display: block')
        {
          this.display_courses = 'display: none'
        }
        else
        {
          this.display_courses = 'display: block'           
        }          
      },

      toggledNav: function () {
        this.display_menu = 'display: none'
        if (this.display_courses == 'display: block' || this.display_alpha == 'display: block')
        {
          this.display_courses = 'display: none'
          //this.display_alpha = 'display: none'
        }
        else
        {
          this.display_courses = 'display: block'
          this.display_alpha = 'display: block'
        }
      },
      
      byAlpha: function () {
        if (this.display_alpha === 'display: block') {
          this.display_alpha = 'display: none'
        } else {
          this.display_alpha = 'display: block'
        }
      },
      getAllCourses()
      {
        var self                                                = this;
        $.when(getData('glossary/getCourses')).then(function( d, textStatus, jqXHR ) 
        {
        
            if(d.response.length > 0) {
                self.allcourses                                     = d.response;
                
                EventBus.$emit("listener-course", self.allcourses);    
            }
            else
                console.log('Query failed to return any course. The database may be down. Please comeback at a later time.');
        }, function(response)
        {
            console.log(response);
        });
      },
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
      },
      getGlossaryLetterIndex()
      {
          var self                                                  = this;

        //populate the alphabet links
        $.when(getData('glossary/index')).then(function( d, textStatus, jqXHR ) 
        {
            if(d.response.length > 0){
                self.alphabetlinks                                  = d.response;

                // for(var first_letter = 0; first_letter < self.alphabetlinks.length; first_letter++)
                // {
                  EventBus.$emit("first_letter_event", self.alphabetlinks); 
                // }
              }
            else
                console.log('Query failed to return a term. The database may be down. Please comeback at a later time.');            
        }, function(response)
        {
            console.log(response);
        });
      },
        getTermList(firstLetter)
        {   
            if(firstLetter)
            {
                var self                                            = this;
                self.contentVisible                                 = false;
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
                        EventBus.$emit("listener-letter-event", self.get_letter);
                        EventBus.$emit("letterLength", self.gloss.length);
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
                        //This Event Bus is to pass the definitions to the child component in this case \flashcard.js  using the variable listener-letter-def-event
                        self.defsForAlpha.push(self.def);
                        EventBus.$emit("listener-letter-def-event", self.defsForAlpha); 
                      }
                    else
                        console.log('Query failed to return a term. The database may be down. Please comeback at a later time.');
                }, function(response)
                {
                    console.log(response);
                });
            }
        },

        openSearch: function() {
          var searchIcon = document.getElementById('searchIcon');
          var searchBar = document.getElementById('keywordSearch');
          if(searchIcon && searchBar)
          {
              searchBar.style.display = 'block';
              searchBar.style.width = '270px';
              searchBar.style.marginLeft = '10px';
              if(window.innerWidth > 770)
              {
                searchBar.style.display = 'none';
              }
              else if(window.innerWidth < 470) {
                searchIcon.style.display = 'block';
              }
              searchIcon.style.display = 'none';
          }
        }
    }
  })
}