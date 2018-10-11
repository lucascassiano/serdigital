const DEVELOPERS_URL = 'https://raw.githubusercontent.com/lucascassiano/serdigital/master/developers.json';

const LoadDevelopers = (callback, url = DEVELOPERS_URL) => {
    var request = new XMLHttpRequest();

    request.open('GET', url);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        console.log(request.response);
        let response = request.response;
        let developers = response.developers;
        console.log("developers", developers);
        if (callback)
            callback(developers);
    }
}

class Developers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            developers: [],
            ready: false
        }

        //loading developers;
        LoadDevelopers((developers) => this.setState({ developers, ready: true }));
    }

    render() {
        let { ready, developers } = this.state;

        let developersList = developers.map((developer, index) => {
            
            let skills = "";
            developer.skills.map((skill, index) => {
                skills += skill;
                if (index < developer.skills.length - 1)
                    skills += ", ";
            })

            return <li className="mdl-list__item mdl-list__item--three-line">
                <span className="mdl-list__item-primary-content">
                    <i className="material-icons mdl-list__item-avatar">person</i>
                    <span>{developer.name}</span>
                    <span className="mdl-list__item-text-body">
                        {skills}
                    </span>
                </span>
                <span className="mdl-list__item-secondary-content">
                    <a className="mdl-list__item-secondary-action" href="#"><i className="material-icons">star</i></a>
                </span>
            </li>
        });

        if (!ready) {
            return <div> <div id="p2" className="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
            </div>
        }
        else
            return <ul className="mdl-list">{developersList}
            </ul>;
    }

}

ReactDOM.render(
    <Developers />,
    document.getElementById('developers')
);

