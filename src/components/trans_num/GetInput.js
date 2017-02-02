import React, { Component } from 'react'; 

const GetInput = props => <div class="input-group">
  <span class="input-group-addon" id="sizing-addon2">@</span>
  <input type="text" 
	className="form-control" 
	placeholder="Nummer" 
	value={props.value} 
    onChange={props.update}
	onKeyDown={props.keydown} 
	aria-describedby="sizing-addon2" />
</div>


export default GetInput ;