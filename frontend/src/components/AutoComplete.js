//This component incorporates the Google Places API to provide a standard text input box and provide a drop down of suggestion based on Google Map's locations.
//The API is connected in the index.html file within Script headers. 
//React Imports
import { useRef, useEffect } from "react";
//This is currently the only generic CSS file in the project, needed so that the preset Google library CSS could be changed. They use '-' and '-' is not allowed in CSS modules. 
import "../components/componentsCSS/autocomplete.css";

const AutoComplete = () => {

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["locality", "park"]
    };
    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
    }, []);

    return(
        <div>
            <input ref={inputRef} id="locationID"/>
        </div>
    );
};
export default AutoComplete;