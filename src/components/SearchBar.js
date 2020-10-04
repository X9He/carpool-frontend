import React from "react";
/* global google */


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    }

    componentDidMount() {
        let locationFromBrowser = null;
        console.log(navigator.geolocation.getCurrentPosition(function(position) {
            locationFromBrowser = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        }));
        let options = {
            location: locationFromBrowser,
            radius: 500,
            rankby: "DISTANCE",
            "types": ["geocode"],
            componentRestrictions: {country: 'ca'
            }};
        this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
            options);

        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    handlePlaceChanged(){
        const place = this.autocomplete.getPlace();
        this.props.onPlaceLoaded(place);
    }


    render() {
        return (
            <input ref={this.autocompleteInput}  id="autocomplete" placeholder="Enter your address"
                   type="text"></input>
        );
    }
}

export default SearchBar;