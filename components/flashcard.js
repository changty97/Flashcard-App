import { FlashcardTemplate } from "../templates/flashcard-template.js";

const Flashcard = {
    template: FlashcardTemplate,
    data() {
        return {
          //gloss: null,
          curr:         0,
          term:         null,
          termid:       null,
          //definition: 'No longer in use; a length, section, or portion of a collection system no longer in service and left in place, underground. For example, when a house or building is razed or removed, the service connection may be left open and unused.',
          num:          null,
          flashCount:   null,
          progress:     1,
          words:        [],
          alphabetlinks:null,
          definition:   null,
        }
    },
    mounted:function()
    {
        var self                                                    = this;
        if(self.gloss == undefined)
            this.getTermList( 'A' );
    },
      methods: {
        getTermList: function(firstLetter)
        {
            if(firstLetter)
            {
                var self                                            = this;
                $.when( getData('glossary/terms/'+firstLetter) ).then(function( d, textStatus, jqXHR ) 
                {
                    if(d.response.length > 0)
                        self.gloss                                  = d.response;
                    else
                        console.log('Query failed to return a term. The database may be down. Please comeback at a later time.');

                    self.flashCount = self.gloss.length;
                    self.num        = 1 + '/' + self.flashCount;
                    self.term       = self.gloss[0].term;
                    self.termid     = self.gloss[0].id;
                    
                    self.getDefinition( self.gloss[0].id );
                }, function(response)
                {
                    console.log(response);
                });
            }
        },
        getDefinition: function(tid)
        {    
            if(tid)
            {
                var self                                            = this;
                $.when( getData('glossary/term/'+tid) ).then(function( data, textStatus, jqXHR ) 
                {
                    if(data.response)
                           
                        self.definition                             = data.response;
                    else
                        console.log('Query failed to return a term. The database may be down. Please comeback at a later time.');
                }, function(response)
                {
                    console.log(response);
                });
            }
        },
        backFlashcard: function () {
          var self                                            = this;
          
          if(self.gloss == undefined)
            this.getTermList( 'A' );
        
          if (this.curr === 0) {
            this.curr = self.flashCount - 1
          } else {
            this.curr--
          }
          this.term = this.gloss[this.curr].term
          //this.definition = this.gloss[this.curr].def
          
          //get the definition
          self.getDefinition( this.gloss[this.curr].id );
          
          this.num = this.curr + 1 + '/' + self.flashCount
          this.progress = this.curr + 1
          this.$refs.flashcard.checked = false
        },
    
        changeFlashcard: function () {
          var self                                            = this;
          
          if(self.gloss == undefined)
            this.getTermList( 'A' );

          if (this.curr === self.flashCount - 1) {
            this.curr = 0
          } else {
            this.curr++
          }
          this.term                     = this.gloss[this.curr].term
          
          //get the definition
          self.getDefinition( this.gloss[this.curr].id );
          //this.definition             = this.gloss[this.curr].def
          
          this.num                      = this.curr + 1 + '/' + self.flashCount
          this.progress                 = this.curr + 1
          this.$refs.flashcard.checked  = false
        },
        shuffle: function () {
          var self                                            = this;
          
          if(self.gloss == undefined)
            this.getTermList( 'A' );
          
          var min = 1
          var max = this.gloss.length
          var random = Math.floor(Math.random() * (+max - +min)) + min
          this.curr = random
          this.term = this.gloss[this.curr].term
          
          //get the definition
          self.getDefinition( this.gloss[this.curr].id );
          //this.definition = this.gloss[this.curr].def
          
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
        cardDisplay:function(){
            if(this.$refs.flashcard.checked)
                $('.back').css('backface-visibility','visible');
            else
                $('.back').css('backface-visibility','hidden');
        }
      }
}


export { Flashcard }