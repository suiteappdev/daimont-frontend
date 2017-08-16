angular.module('shoplyApp').filter('selectedItems', function() {
    return function(records, _value) {
    		console.log("inicial", _value);
    		if(!_value){
    			return records;
    		}

	        return records.filter(function(record) {
	            	for (var y = 0; y < record._route.length; y++) {
		                if (record._route[y]._id == _value) {
		                    return true;
		                }else{
		                	return false;
		                }
	            	};


	            return false;
	        });      		
    };
})