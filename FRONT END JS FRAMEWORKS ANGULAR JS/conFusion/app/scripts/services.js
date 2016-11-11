'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")
        .service('menuFactory', ['baseURL' , '$resource', function(baseURL, $resource) {
    
                
                         this.getDishes = function(){
                                return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
                                    };
    
                // implement a function named getPromotion
                // that returns a selected promotion.
                
                this.getPromotion = function () {
                  return $resource(baseURL+"promotions/:id",null,  {'update':{method:'PUT' }});
                };
    
                        
        }])

        .factory('corporateFactory', ['baseURL' , '$resource', function(baseURL, $resource) {
    
            var corpfac = {};
    
     
            // Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            // Remember this is a factory not a service
  
            corpfac.getLeaders = function () {
              return $resource(baseURL+"leadership/:id",null,  {'save':{method:'POST' }});
            };

            return corpfac;
    
        }])

        .factory('feedbackFactory', ['baseURL', '$resource', function(baseURL, $resource){
            var feedFac = {};

            feedFac.getFeedback = function() {
                return $resource(baseURL+"feedback",null,  {'update':{method:'SAVE' }});
            }

            return feedFac;
        }])

;
