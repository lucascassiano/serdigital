const DEVELOPERS_URL = 'https://raw.githubusercontent.com/lucascassiano/serdigital/master/developers.json';

ReactDOM.render(
    <p>loading developers...</p>,
    document.getElementById('developers')
);

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

        let developersList = developers.map((developer) => {
            return <div>
                <p>{developer.name}</p>
                {developer.skills}
            </div>
        });

        if (!ready) {
            return <div>loading developers...</div>
        }
        else
            return <div>{developersList}</div>;
    }


}

ReactDOM.render(
    <Developers />,
    document.getElementById('developers')
);

