angular.module('whoWhatWhere').factory('GetDataSource', ['$http', '$q', function ($http, $q) {
    var counter=0,
        location;
    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }

    return {
        "retrieveYelp": function (loc,term) {
            if(_.isUndefined(loc) ){
                location= 'california'
            }else {
                location = loc
            }
            var defered = $q.defer();
            var method = 'GET';
            var url = 'http://api.yelp.com/v2/search';
            var params = {
                callback: 'angular.callbacks._'+counter,
                location: location,
                oauth_consumer_key: 'hyIQVkkGLREDsZobyPp5dQ', //Consumer Key
                oauth_token: 'PCPmAjNSEpcZ4T7TFaQ3VKj8-nhhRhWJ', //Token
                oauth_signature_method: "HMAC-SHA1",
                oauth_timestamp: new Date().getTime(),
                oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                term: term
            };
            var consumerSecret = 'UgKdpO46BHlEOT-3K3MIPilF-Ro'; //Consumer Secret
            var tokenSecret = 'uF-cSlKj9usvzCIjSeVzwR2OcS8'; //Token Secret
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {encodeSignature: false});
            params['oauth_signature'] = signature;
            $http.jsonp(url, {params: params})
                .success(function (data) {
                    defered.resolve(data.businesses);
                })
                .catch(function (data) {
                    defered.resolve(data.status);
                });
            counter++;
            return defered.promise;
        },
        "retrieveFourSquare": function (loc,term) {
            var defered = $q.defer();
            var location = loc;
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyCaYvznuqMlCY-MgDb773mIPwQIJMLEjDw').success(function (dataFourSquare) {
                var lat = dataFourSquare.results[0].geometry.location.lat;
                var lng = dataFourSquare.results[0].geometry.location.lng;
                $http.get('https://api.foursquare.com/v2/venues/search?ll=' + lat + ',' + lng + '&oauth_token=EL0IVDHI4CCTPDPJANFZODFQCFQSZJF5DIBOLFFXAT2PQZHW&v=20160906&query='+ term +'')
                    .success(function (data) {
                        defered.resolve(data.response.venues);
                    });
            });
            return defered.promise;
        }
    }
}]);
