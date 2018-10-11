function getLocation(callback) {
    let location = {};

    if (navigator.geolocation) {
        location = navigator.geolocation.getCurrentPosition(
            function (position) {
                let { latitude, longitude } = position.coords;
                let geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(latitude, longitude);
                geocoder.geocode(
                    { 'latLng': latlng },
                    function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                var add = results[0].formatted_address;
                                var value = add.split(",");
                                let locationObj = {
                                    latitude,
                                    longitude,
                                    street: value[0],
                                    state: value[2],
                                    zip: value[3],
                                    country: value[4]
                                }
                                callback(locationObj);
                            }
                            else {
                                return null
                            }
                        }
                        else {
                            return null
                        }
                    }
                );
            }
        );
    }

}

class GetStarted extends React.Component {
    constructor(props) {
        super(props);
        getLocation(this.setPosition);
    }

    setPosition = (position) => {
        console.log("position", position);
    }

    render() {
        return <div>Get Started</div>
    }
}

ReactDOM.render(
    <GetStarted />,
    document.getElementById('get-started')
);
