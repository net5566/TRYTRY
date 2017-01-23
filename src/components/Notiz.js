import React, { Component } from 'react';


class Notiz extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userslist : [],
    };
  }

  componentDidMount() {
    // fetch `/api/users` to get users and then set state...
//    let tempList= [];
//    const tempStr = `#/deu161201`;
//    tempList.push(<li key={0}><a href={tempStr}>20161201</a></li>)
//    this.setState ({ userslist: tempList});

    fetch('/api/notiz')
      .then(res=>res.json())
      .then ( json => {
          let tempList= [];
      //  const tempStr = `#/Deu161201`;
      //  tempList.push(<li key={0}><a href={tempStr}>link {1}</a></li>)
        for (let i=0, n= json.notiz.length; i < n ; i++ ) {
        //  const tempStr = `#/deu161201`;
          const tempStr = `#/deu${json.notiz[i].date}`;
          tempList.push(<li key={i}><a href={tempStr}>20{json.notiz[i].date}</a></li>)
        }
  //     console.log(tempList);
        this.setState ({ userslist: tempList});
    });

  }

  render() {


      const thelist = this.state.userslist;
      if(thelist === undefined) {
        return <h1> WTF </h1> ;
      }
      else {
        return <div>
        <h3>Notiz </h3>
        <div>{thelist}</div>
      </div> ;
      }
      }
}

export default Notiz;
