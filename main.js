import Vue from 'https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.esm.browser.min.js'

//import templates
import {
    MainTemplate
} from './templates/main-template.js'

//import components
import { Flashcard } from './components/flashcard.js'
import { Water1 } from './components/water1.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: 
  [
    { path: '/flashcard', component: Flashcard },
    { path: '/flashcard/courses/water-treatment-plant-operation-v1/', component: Water1 },
  ]
})

if(document.getElementById("flashcard-app"))
{
  new Vue({
    el: '#flashcard-app', // This should be the same as your <div id=""> from earlier.
    router,
    template: MainTemplate,
    data: {
        gloss:              null,
        display_menu: 'display: none',
        display_courses: 'display: none',
        display_alpha: 'display: none',
        menu_op1: 'By Course',
        menu_op2: 'By Alphabetical',
        search: '',
        allcourses:         null,
        alphabetlinks:      null,
        terms:              null,
        definition:         null,
    },
    mounted:function()
    {
        var self                                                    = this;
        self.getAllCourses();
        self.getGlossaryLetterIndex();
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
        
            if(d.response.length > 0)
                self.allcourses                                     = d.response;
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
                //console.log(data.response);
                if(data.response)
                    self.gloss                                  = data.response;
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
            if(d.response.length > 0)
                self.alphabetlinks                                  = d.response;
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
                //document.getElementById('glossary_title').innerHTML = 'Water and Wastewater Terms Beginning ' + firstLetter;
                //document.getElementById('sub_headline').innerHTML   = '';
                var self                                            = this;
                self.contentVisible                                 = false;
                $.when( getData('glossary/terms/'+firstLetter) ).then(function( d, textStatus, jqXHR ) 
                {
                    if(d.response.length > 0)
                    {
                        self.gloss                                  = d.response;
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
                    console.log(data.response);
                    if(data.response)
                        self.definition                             = data.response;
                    else
                        console.log('Query failed to return a term. The database may be down. Please comeback at a later time.');
                }, function(response)
                {
                    console.log(response);
                });
            }
        }
    }
  })
}