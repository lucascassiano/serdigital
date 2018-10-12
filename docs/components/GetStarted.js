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

class SubscribeModal extends React.Component {
    onClose = () => {
        if (this.props.onClose)
            this.props.onClose();
    }

    render() {
        let modalClass = this.props.open ? "modal modal-open" : "modal";
        
        return (
            <div id="myModal" className={modalClass}>
                <div className="modal-content">
                    <span className="close" onClick={this.onClose}>&times;</span>
                    <p>Some text in the Modal..</p>
                </div>
            </div>
        )

    }
}

class GetStarted extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            name: null,
            github: null,
            webpage: null,
            skills: null,

        }
        getLocation(this.setPosition);
        this.updateData = this.updateData.bind(this);

        OnLoadData(this.updateData);
    }

    toggleSubscribe = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    updateData(data) {
        console.log("data loaded on Get Started", data);
        let skillsList = [];
        let namesList = [];

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        for (var i in data) {
            let developer = data[i];
            namesList.push(developer.name);
            skillsList = skillsList.concat(developer.skills);

        }

        //get unique Elements only (remove duplicateds)
        skillsList = skillsList.filter(onlyUnique);
        console.log("skills list", skillsList);

        let allLists = namesList.concat(skillsList);
        autocomplete(document.getElementById('search-input'), allLists);
        //let allSkills = 

    }
    setPosition = (position) => {
        console.log("position", position);
    }

    componentDidMount() {
        console.log("attaching component");

    }

    render() {
        return <div className="get-started">
            <div className="card blue">
                <h3><strong>Procure</strong> por profissionais</h3>

                <div className="search-field">
                    <div className="autocomplete">
                        <input id="search-input" placeholder="Desenvolvedores, Designers, Ferramentas..."></input>
                        <div className="search-button"><i className="fas fa-search fa-lg"></i></div>
                    </div>
                </div>

                <p>Simples sistema de busca pelos dados inseridos no github do projeto</p>
            </div>

            <div className="card">
                <h3><strong>Cadraste-se</strong> na nossa lista</h3>
                <p>Esta é uma lista auto-gerenciada, todos os membros participam de sua edição e menutenção</p>
                <button className="button" onClick={this.toggleSubscribe}>Cadastrar</button>
            </div>

            <SubscribeModal open={this.state.modalOpen} onClose={this.toggleSubscribe} />
        </div>
    }
}

ReactDOM.render(
    <GetStarted />,
    document.getElementById('get-started')
);



/* -- auto complete UI component--*/
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}