angular.module('whoWhatWhere').factory('foursqureData', function () {
    var image, name, address, lan, lat, url;
    return {
        "foursqureFilterData": function (data) {
            if (!_.isUndefined(data)) {
                console.log('forceData',data);
                var filterfoursqureArray = [];
                for (var i = 0; i < data.length; i++) {
                    if (_.isUndefined(data[i].image_url)) {
                        image = 'assets/images/no_image.png';
                    } else {
                        image = data[i].image_url;
                    }
                    if (_.isUndefined(data[i].location.formattedAddress)) {
                        address = ['Not Provided'];
                    } else {
                        address = data[i].location.formattedAddress;
                    }
                    if (_.isUndefined(data[i].name)) {
                        name = 'Not Provided';
                    } else {
                        name = data[i].name;
                        var urlName = name.split(' ');
                        var uName = "";
                        for (var j = 0; j < urlName.length; j++) {
                            uName = uName + urlName[j];
                        }
                        url = 'www.' + uName + '.com'
                    }
                    if (_.isUndefined(data[i].location.lat)) {
                        lat = 'Not Provided';
                    } else {
                        lat = data[i].location.lat;
                    }
                    if (_.isUndefined(data[i].location.lng)) {
                        lan = 'Not Provided';
                    } else {
                        lan = data[i].location.lng;
                    }
                    filterfoursqureArray[i] = {
                        image: image,
                        name: name,
                        address: address,
                        lat: lat,
                        lan: lan,
                        url: url
                    };
                }

                return filterfoursqureArray;
            }
        }
    }
});