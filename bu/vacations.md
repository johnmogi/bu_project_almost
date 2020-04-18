import \* as React from "react"; import { Component, ChangeEvent } from "react"; import { VacsModel } from "../models/vacs-model"; import { Unsubscribe } from "redux"; import { store } from "../redux/store"; import Card from "react-bootstrap/Card"; import Row from "react-bootstrap/Row"; import Form from "react-bootstrap/Form"; import Col from "react-bootstrap/Col"; import ListGroup from "react-bootstrap/ListGroup";

import "./vacations.css";

import { UserModel } from "../models/user-model"; import { toast } from "react-toastify"; // import { VacCard } from "./vac-card";

const PORT = process.env.PORT || 3012;

interface VacationsState { arrangedVacs: Boolean; // followed: Boolean; user: UserModel; vacs: VacsModel[]; userLogged: boolean; vacsFollowed: VacsModel[]; }

export class Vacations extends Component

<any, vacationsstate=""> {
private unsubscribe: Unsubscribe;</any,>

public constructor(props: any) { super(props); this.state = { arrangedVacs: false, // followed: false, user: store.getState().user, vacs: store.getState().vacations, userLogged: store.getState().userLogged, vacsFollowed: store.getState().vacsFollowed };

```
this.unsubscribe = store.subscribe(() => {
  this.setState({ user: store.getState().user });
  this.setState({ vacs: store.getState().vacations });
  this.setState({ userLogged: store.getState().userLogged });
  this.setState({ vacsFollowed: store.getState().vacsFollowed });
});
```

} public async componentDidMount() { try { fetch(`http://localhost:${PORT}/api/vacations`) .then(res => res.json()) .then(vacs => this.setState({ vacs })) .catch(err => toast.error(err.message)); } catch (err) { toast.error(err.message); } if (store.getState().userLogged) { try { toast("One second... arranging your followed vacations..."); const id = +this.state.user.userID; fetch(`http://localhost:${PORT}/api/auth/follow/${id}`) .then(response => response.json()) .then(vacsFollowed => this.setState({ vacsFollowed })) .catch(err => toast.error(err.message)); } catch (err) { toast.error(err.message); } } // setTimeout(() => { // this.arrangeVacs(); // }, 2000); } public componentDidUpdate = () => { if (store.getState().userLogged && this.state.vacsFollowed.length > 0) { } };

private arrangeVacs() { const vacs = [...this.state.vacs]; const newVacsFollowed = [...this.state.vacsFollowed];

```
for (let i = 0; i < this.state.vacsFollowed.length; i++) {
  const index = vacs.findIndex(
    v => v.vacationID === newVacsFollowed[i].vacationID
  );
  const vacation = vacs[index];
  vacation.follow = true;
  vacs.splice(index, 1);
  vacs.unshift(vacation);
  this.setState({ vacs: vacs });
}
```

}

public getUserFollowedVacs = (args: ChangeEvent

<htmlinputelement>) =&gt; {
if (this.state.userLogged === false) {
toast.error("Only logged in users can follow vacations");
return;
}
const userId = this.state.user.userID;
const vacNum = +args.target.value;
// this.setState({ arrangedVacs: true });</htmlinputelement>

```
const sendInfo = `{ userID:${userId} , vacationID: ${vacNum} }`;

const vacsFollowed = { ...this.state.vacsFollowed };
toast(JSON.stringify(vacsFollowed));

// vacsFollowed.push(sendInfo);
toast(args.target.value);
this.setState({ vacsFollowed });

// this.arrangeVacs();

// this.checkVacs();
```

};

render() { return (

<section classname="card">
  <row classname="vacations justify-content-md-center">
          {this.state.vacs.map(v =&gt; (
            
              {/<em><switch onchange="{this.checkVacs}" value="{v.vacationID}">
</switch></em>/}
              <card>
  <form.group controlid="formBasicCheckbox">
                  {/<em> type="switch" </em>/}<p></p><pre><code>              &lt;Form.Check
                type="checkbox"
                onChange={this.getUserFollowedVacs}
                value={v.vacationID}
              /&gt;
            &lt;/Form.Group&gt;
            &lt;img
              className="image-card-top"
              src={`/assets/images/${v.picFileName}`}
            /&gt;
            &lt;Card.Body&gt;
              &lt;Card.Title&gt;{v.destination}&lt;/Card.Title&gt;
              &lt;Card.Text&gt;{v.description}&lt;/Card.Text&gt;
            &lt;/Card.Body&gt;
            &lt;ListGroup variant="flush"&gt;
              &lt;ListGroup.Item&gt;
                Portal leaves on : {v.startDate}
              &lt;/ListGroup.Item&gt;
              &lt;ListGroup.Item&gt;Costs :{v.price} $&lt;/ListGroup.Item&gt;
              &lt;ListGroup.Item&gt;Time ends on : {v.endDate}&lt;/ListGroup.Item&gt;
            &lt;/ListGroup&gt;
          &lt;/Card&gt;
        &lt;/Col&gt;
      ))}
    &lt;/Row&gt;
  &lt;/section&gt;
);
</code></pre><p>  }
}</p></form.group>
</card></row>
</section>
