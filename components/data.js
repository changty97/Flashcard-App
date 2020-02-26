//Global Variables 
var gloss         = null; //This one is grabbing data from the database
var allcourses    = null;
var alphabetlinks = null;
var def           = null; //This one is grabbing data from the database

//Functions assigned to the data variable
var data          = {
    getAllCourses()
    {
        $.when(getData('glossary/getCourses')).then(function( d, textStatus, jqXHR ) 
        {
            
            if(d.response.length > 0) {
                allcourses                                     = d.response; 
                console.log(allcourses)
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
            $.when( getData('glossary/getTermsByCat/'+cid) ).then(function( data, textStatus, jqXHR ) 
            {
                if(data.response) {
                    gloss                                  = data.response;
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
        //populate the alphabet links
        $.when(getData('glossary/index')).then(function( d, textStatus, jqXHR ) 
        {
            if(d.response.length > 0){
                alphabetlinks                                  = d.response;
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
                $.when( getData('glossary/terms/'+firstLetter) ).then(function( d, textStatus, jqXHR ) 
                {
                    if(d.response.length > 0)
                    {
                        gloss                                  = d.response;
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
                        def                             = data.response;
                      }
                    else
                        console.log('Query failed to return a term. The database may be down. Please comeback at a later time.');
                }, function(response)
                {
                    console.log(response);
                });
            }
        },
        display() 
        {
            console.log(allcourses);
        }
  }
  
export { 
    data, 
    gloss, 
    allcourses, 
    alphabetlinks, 
    def
}
 
