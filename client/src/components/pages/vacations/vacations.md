```
//* this should be blocked, the request is...
try {
  const response = await axios.get<vacsFollowed>(
    `http://localhost:${PORT}/api/vacations`,
    { withCredentials: true }
  );
  const vacsFollowed = response.data;
  this.setState({ vacsFollowed });
} catch (err) {
  alert(err.message);
}
```

import React, { Component } from "react"; import "./vacations.css"; import axios from "axios"; import { ServerData } from "../../models/some-server-data-model"; import { store } from "../../redux/store"; import { VacsModel } from "../../models/vacation-model";

interface VacationsState { vacs: VacsModel[]; ServerData: ServerData; }

export class Vacations extends Component

<any, vacationsstate=""> {</any,>

```
public constructor(props: any) {
    super(props);
    this.state = {
        vacs: [],
        ServerData: new ServerData()
    };
}

public async componentDidMount() {
    try {
        // Registered Users...
        if (!store.getState().isLoggedIn) {
            this.props.history.push("/login");
            return;
        }
        const response = await axios.get<VacsModel>("http://localhost:3001/api/vacations", { withCredentials: true }); // { withCredentials: true } causes the cookie to be sent to server.
        // const ServerData = response.data;
        // this.setState({ ServerData }); 
        const vacs = response.data;
        this.setState({ vacs: [] });
        // this.setState({ vacs });
    }
    catch (err) {
        alert(err.message);
    }
}

public render() {
    return (



        <div className="vacations row">
            <h2>Vacations</h2>
            {/* {this.state.vacs.map(v => (
            ))} */}

            {/* {this.state.vacs.map(v => (
                <div className="card col-5" key={v.vacationID}>
                    <VacCard
                        value={v.vacationID}
                        vacationID={v.vacationID}
                        id={v.vacationID}
                        vacationName={v.vacationName}
                        description={v.description}
                        destination={v.destination}
                        picFileName={v.picFileName}
                        startDate={v.startDate}
                        endDate={v.endDate}
                        price={v.price}
                    />
                </div>
            ))} */}
        </div>
    );
}
```

}
