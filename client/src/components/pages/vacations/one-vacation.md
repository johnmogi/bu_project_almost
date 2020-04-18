import * as React from "react"; import { Component } from "react"; import { VacsModel } from "../../models/vacs-model"; // import { VacsModel } from "../models/vacs-model";

interface countryState { vac: VacsModel[]; }

export class vacPage extends Component

<any, countrystate=""> {
  public constructor(props: any) {
    super(props);
    this.state = {
      vac: []
    };
  }
  componentDidMount = () =&gt; {
    const id = +this.props.match.params.id;
    fetch("<a href="http://localhost:3012/api/vacations/">http://localhost:3012/api/vacations/</a>" + id)
      .then(res =&gt; res.json())
      .then(vac =&gt; this.setState({ vac }))
      .catch(err =&gt; alert(err.message));
  };</any,>

public render(): JSX.Element { return (

<div classname="vacation">
        {this.state.vac.map(g =&gt; (
          <div key="{g.vacationID}" classname="card container">
  <cardheader avatar="{<Avatar" aria-label="recipe">R}
              action={<iconbutton aria-label="settings">
</iconbutton>}
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            /&gt;
            ++
            <p classname="card-title mx-auto">{g.vacationName}</p><ul><li>{g.description}</li><li>{g.destination}</li><li>{g.picFileName}</li><li>{g.startDate}</li>
              {/<em><li>&lt;{g.endDate}</li></em>/}
              <li>{g.price}</li></ul>
            {g.description}
            <cardmedia image="{`/assets/images/${g.picFileName}`}" title="{g.description}">
            {/<em><img classname="card-img-top" src="{`/assets/images/${g.picFileName}`}" alt="{g.description}"></em>/}
          </cardmedia></cardheader>
</div>
        ))}
      </div>

 ); } }
