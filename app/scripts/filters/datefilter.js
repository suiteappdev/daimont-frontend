angular.module('shoplyApp').filter('dateRange', function ()
{
 	return function (data, greaterThan, lowerThan) {
                 if (greaterThan != null && lowerThan != null && greaterThan != undefined && lowerThan != undefined) {
                    data = data.filter(function (item) {
                        if (item.createdAt != null) {
                           var exDate = new Date(item.createdAt);
                           return exDate >= new Date(greaterThan) && exDate <= new Date(lowerThan);
                        }
                    });
                }
                return data;
    };
});