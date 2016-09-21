app.controller("mainController", function ($scope, NgMap, GetDataSource, yelpData, foursqureData, $location) {

    function dataRequest(cityName, ItemName) {
        $scope.personalData = [];

        GetDataSource.retrieveFourSquare(cityName, ItemName).then(function (fourData) {
            GetDataSource.retrieveYelp(cityName, ItemName).then(function (yData, callback) {
                var yData = yelpData.yelpFilterData(yData);
                var fourQData = foursqureData.foursqureFilterData(fourData);
                var margeData = _.unionBy(yData, fourQData);
                var i = 0;
                while (i < 25) {
                    $scope.personalData.push({
                        name: margeData[i].name,
                        address: margeData[i].address,
                        ratingImage: margeData[i].ratingImage,
                        image: margeData[i].image,
                        phone: margeData[i].phone,
                        lat: margeData[i].lat,
                        lan: margeData[i].lan,
                        url: margeData[i].url
                    });
                    i++
                }
            });

        });
    }

    $scope.menus = ["Foods", "LifeStyle", "Fun", "Bar", "Coffee", "Restaurants"];

    NgMap.getMap().then(function (map) {
        $scope.map = map;
    });

    $scope.showCity = function (event, city, flag) {
        if (flag) {
            $scope.cityName = city;
            $scope.map.showInfoWindow('myInfoWindow', this);
        } else {
            $scope.map.hideInfoWindow('myInfoWindow', this);
        }
    };

    $scope.icon = {
        "scaledSize": [20, 40],
        "url": "assets/images/myMarker.png"
    };

    $scope.onclickMenuItem = function (event) {
        $scope.city='';
        $scope.menuItem='';
        var itemName = event.target.id;
        var cityName = 'sydney';
        dataRequest(cityName, itemName);
    };
    $scope.onSubmitClick = function () {
        if (!_.isUndefined($scope.city) && !_.isUndefined($scope.menuItem)) {
            dataRequest($scope.city, $scope.menuItem);
            $location.path('/business');
        }
    };
});
