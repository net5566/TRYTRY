import React, { Component, PropTypes } from 'react';


class SingleUserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userProfile : [],
      thesite : '',
    };
  }


  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  componentDidMount() {
    // fetch `/api/users/${id}` to get user and then set state...
    fetch (`/api/links/${this.props.id}`)
    	.then(res=>res.json())
    	.then(json =>
    	{
    		let tempData = [];
    		const tempSite = `${json.site}`;
    	//	console.log(tempAvatar);
    		const tempName = `${json.name}`;
    	//	console.log(json.name);
    		const tempAge = `${json.comment}`;
    //		tempData.push(<li key={0}>{tempSite}</li>);
    		tempData.push(<li key={1}>{tempName}</li>);
    		tempData.push(<li key={2}>{tempAge}</li>);
    		this.setState({ userProfile:tempData });
        this.setState({ thesite:tempSite} );
    	});
  }

  render() {
    return <div> Link {this.props.id}
    <h3><a href={this.state.thesite}>{this.state.userProfile[0]}</a></h3>
    <div> {this.state.userProfile[1]} </div>
    <div> 網址: {this.state.thesite} </div>

    </div>;
  }
}

export default SingleUserPage;
