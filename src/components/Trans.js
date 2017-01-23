import React, { Component } from 'react';

class Trans extends Component {

	constructor(props) {
		super(props);

		this.state = {
		text_input:'',
		text_output:'',
		text_show:'',
		flag:false
		}; 

		this.dotrans=this.dotrans.bind(this);
		this.update_input=this.update_input.bind(this);
	}

	update_input(words) {
		this.setState({text_input: words.target.value});
		//if(this.state.flag) this.setState({text_output: ''});
	}

	dotrans(e){


		if (this.state.flag && e.keyCode != 13) {
			this.setState({flag:false});
			this.setState({text_output: ''});
		}
		if (!this.state.flag && e.keyCode == 13 && this.state.text_input.trim() !== '') {
			if (isNaN(this.state.text_input)) {
				this.setState({ text_output: '請輸入數字'});
			}
			else if (Number(this.state.text_input) > 1000000) {
				this.setState({ text_output: '目前不支援100萬以上的數字'});
			}
			else {
				if (this.state.text_input === '1000000') this.setState({ text_output:'eine Million' });
				else if (this.state.text_input.length === 1) this.onedigit();
				else if (this.state.text_input.length === 2) this.twodigit('',0);
				else if (this.state.text_input.length === 3) this.threedigit('',0);
				else if (this.state.text_input.length === 4) this.fourdigit();
				else if (this.state.text_input.length === 5) this.fivedigit();
				else if (this.state.text_input.length === 6) this.sixdigit();
			}

			this.setState({ flag: true});

		}
	}


 	render() {
    	return  (
    		<div className="blog-post">
              <h2 className="blog-post-title">數字轉換器</h2>

              <p>由於德文的數字寫成德文的時候<strong>非常長</strong>對初學者來說可能會出錯，於是想要寫一個轉換器來讓大家練習。</p>
              <p><font size='1'>這好像也是leetcode裡面的一道題目的類題(?)</font></p>
              <blockquote>
              	<h4>目前0到1000000的數字都可以處理得很好，但是也只有到這裡而已XD</h4>
              	<strike><font size='1'>還有其實是怕淪為純粹的CSS跟template還有後端連線才寫這個</font></strike>
              </blockquote>

              <GetInput value={this.state.text_input} update={this.update_input} keydown={this.dotrans} />
              <pre><code>{this.state.text_output}</code></pre>


            </div> );

  }

	onedigit() {

		if (this.state.text_input === '0') this.setState({ text_output:'null' });
		else if (this.state.text_input == '1') this.setState({ text_output:'eins' });
		else if (this.state.text_input == '2') this.setState({ text_output:'zwei' });
		else if (this.state.text_input == '3') this.setState({ text_output:'drei' });
		else if (this.state.text_input == '4') this.setState({ text_output:'vier' });
		else if (this.state.text_input == '5') this.setState({ text_output:'fünf' });
		else if (this.state.text_input == '6') this.setState({ text_output:'sechs' });
		else if (this.state.text_input == '7') this.setState({ text_output:'sieben' });
		else if (this.state.text_input == '8') this.setState({ text_output:'acht' });
		else if (this.state.text_input == '9') this.setState({ text_output:'neun' });
	}

	twodigit(love,site) {
		if (this.state.text_input[site]==='0') this.setState({ text_output:'請不要用0開頭我很為難' });
		else if(this.state.text_input[site]==='1') {
			if (this.state.text_input[site+1] === '0') love = love+'zehn' ;
			else if (this.state.text_input[site+1] == '1') love = love+'elf' ;
			else if (this.state.text_input[site+1] == '2') love = love+'zwölf' ;
			else if (this.state.text_input[site+1] == '3') love = love+'dreizehn' ;
			else if (this.state.text_input[site+1] == '4') love = love+'vierzehn' ;
			else if (this.state.text_input[site+1] == '5') love = love+'fünfzehn' ;
			else if (this.state.text_input[site+1] == '6') love = love+'sechzehn' ;
			else if (this.state.text_input[site+1] == '7') love = love+'siebzehn' ;
			else if (this.state.text_input[site+1] == '8') love = love+'achtzehn' ;
			else if (this.state.text_input[site+1] == '9') love = love+'neunzehn' ;
			this.setState({ text_output:love });
		}
		else  {
		//	if (this.state.text_input[site+1] === '0') this.setState({ text_output:text_output+'zwanzig' });
			if (this.state.text_input[site+1] == '1') love = love+'einund';//this.setState({ text_output:this.state.text_output+'einund' });
			else if (this.state.text_input[site+1] == '2') love = love+'zweiund' ;
			else if (this.state.text_input[site+1] == '3') love = love+'dreiund' ;
			else if (this.state.text_input[site+1] == '4') love = love+'vierund' ;
			else if (this.state.text_input[site+1] == '5') love = love+'fünfund' ;
			else if (this.state.text_input[site+1] == '6') love = love+'sechsund' ;
			else if (this.state.text_input[site+1] == '7') love = love+'siebenund' ;
			else if (this.state.text_input[site+1] == '8') love = love+'achtund' ;
			else if (this.state.text_input[site+1] == '9') love = love+'neunund' ;
			else { }
	//		console.log(love);
			if(this.state.text_input[site]==='2') love = love + 'zwanzig';
			else if(this.state.text_input[site]==='3') love = love+'dreißig' ;
			else if(this.state.text_input[site]==='4') love = love+'vierzig' ;
			else if(this.state.text_input[site]==='5') love = love+'fünfzig' ;
			else if(this.state.text_input[site]==='6') love = love+'sechzig' ;
			else if(this.state.text_input[site]==='7') love = love+'siebzig' ;
			else if(this.state.text_input[site]==='8') love = love+'achtzig' ;
			else if(this.state.text_input[site]==='9') love = love+'neunzig' ;
			this.setState({ text_output:love });

		}

		return love;

	}

	threedigit(love,site) {

		if (this.state.text_input[site]==='0') {
			this.setState({ text_output:'請不要用0開頭我很為難' });
			return;
		}

		if(this.state.text_input[site]==='1') love = love+'ein';
		else if(this.state.text_input[site]==='2') love = love+'zwei' ;
		else if(this.state.text_input[site]==='3') love = love+'drei' ;
		else if(this.state.text_input[site]==='4') love = love+'vier' ;
		else if(this.state.text_input[site]==='5') love = love+'fünf' ;
		else if(this.state.text_input[site]==='6') love = love+'sechs' ;
		else if(this.state.text_input[site]==='7') love = love+'sieben' ;
		else if(this.state.text_input[site]==='8') love = love+'acht' ;
		else if(this.state.text_input[site]==='9') love = love+'neun' ;

		love = love + 'hundert';
		this.setState({ text_output:love });

		if (this.state.text_input[site+1]==='0') {
			if (this.state.text_input[site+2]==='0') {} 
			else {
				if(this.state.text_input[site+2]==='1') love = love + 'eins';
				else if(this.state.text_input[site+2]==='2') love = love + 'zwei';
				else if(this.state.text_input[site+2]==='3') love = love + 'drei';
				else if(this.state.text_input[site+2]==='4') love = love + 'vier';
				else if(this.state.text_input[site+2]==='5') love = love + 'fünf';
				else if(this.state.text_input[site+2]==='6') love = love + 'sechs';
				else if(this.state.text_input[site+2]==='7') love = love + 'sieben';
				else if(this.state.text_input[site+2]==='8') love = love + 'acht';
				else if(this.state.text_input[site+2]==='9') love = love + 'neun';
				this.setState({ text_output:love });
			}
		}
		else {
			love =  this.twodigit(love,site+1);
		}
		return love ;

	}


	fourdigit() {
		let love = '';
		let site = 0 ;
		if (this.state.text_input[site]==='0') {
			this.setState({ text_output:'請不要用0開頭我很為難' });
			return;
		}
		else if(this.state.text_input[site]==='1') love = love+'ein';
		else if(this.state.text_input[site]==='2') love = love+'zwei' ;
		else if(this.state.text_input[site]==='3') love = love+'drei' ;
		else if(this.state.text_input[site]==='4') love = love+'vier' ;
		else if(this.state.text_input[site]==='5') love = love+'fünf' ;
		else if(this.state.text_input[site]==='6') love = love+'sechs' ;
		else if(this.state.text_input[site]==='7') love = love+'sieben' ;
		else if(this.state.text_input[site]==='8') love = love+'acht' ;
		else if(this.state.text_input[site]==='9') love = love+'neun' ;

		love = love + 'tausend';
		this.setState({ text_output:love });

		if(this.state.text_input[site+1]==='0') {
			if(this.state.text_input[site+2]=='0') {
				if(this.state.text_input[site+3]=='0') return;
				else {
					if(this.state.text_input[site+3]==='1') love = love + 'eins';
					else if(this.state.text_input[site+3]==='2') love = love + 'zwei';
					else if(this.state.text_input[site+3]==='3') love = love + 'drei';
					else if(this.state.text_input[site+3]==='4') love = love + 'vier';
					else if(this.state.text_input[site+3]==='5') love = love + 'fünf';
					else if(this.state.text_input[site+3]==='6') love = love + 'sechs';
					else if(this.state.text_input[site+3]==='7') love = love + 'sieben';
					else if(this.state.text_input[site+3]==='8') love = love + 'acht';
					else if(this.state.text_input[site+3]==='9') love = love + 'neun';
					this.setState({ text_output:love });
				}
			}
			else this.twodigit(love,site+2);
		}
		else this.threedigit(love,site+1);

	}

	fivedigit() {
		if (this.state.text_input[site]==='0') {
			this.setState({ text_output:'請不要用0開頭我很為難' });
			return;
		}
		let love = '';
		let site = 1 ;
		love = this.twodigit('',0);
		console.log(love);
		love = love + 'tausend';
		this.setState({ text_output:love });
		if(this.state.text_input[site+1]==='0') {
			if(this.state.text_input[site+2]=='0') {
				if(this.state.text_input[site+3]=='0') return;
				else {
					if(this.state.text_input[site+3]==='1') love = love + 'eins';
					else if(this.state.text_input[site+3]==='2') love = love + 'zwei';
					else if(this.state.text_input[site+3]==='3') love = love + 'drei';
					else if(this.state.text_input[site+3]==='4') love = love + 'vier';
					else if(this.state.text_input[site+3]==='5') love = love + 'fünf';
					else if(this.state.text_input[site+3]==='6') love = love + 'sechs';
					else if(this.state.text_input[site+3]==='7') love = love + 'sieben';
					else if(this.state.text_input[site+3]==='8') love = love + 'acht';
					else if(this.state.text_input[site+3]==='9') love = love + 'neun';
					this.setState({ text_output:love });
				}
			}
			else this.twodigit(love,site+2);
		}
		else this.threedigit(love,site+1);

	}

	sixdigit() {

		if (this.state.text_input[site]==='0') {
			this.setState({ text_output:'請不要用0開頭我很為難' });
			return;
		}
		let love = '';
		let site = 2 ;
		love = this.threedigit('',0);
		love = love + 'tausend';
		this.setState({ text_output:love });
		if(this.state.text_input[site+1]==='0') {
			if(this.state.text_input[site+2]=='0') {
				if(this.state.text_input[site+3]=='0') return;
				else {
					if(this.state.text_input[site+3]==='1') love = love + 'eins';
					else if(this.state.text_input[site+3]==='2') love = love + 'zwei';
					else if(this.state.text_input[site+3]==='3') love = love + 'drei';
					else if(this.state.text_input[site+3]==='4') love = love + 'vier';
					else if(this.state.text_input[site+3]==='5') love = love + 'fünf';
					else if(this.state.text_input[site+3]==='6') love = love + 'sechs';
					else if(this.state.text_input[site+3]==='7') love = love + 'sieben';
					else if(this.state.text_input[site+3]==='8') love = love + 'acht';
					else if(this.state.text_input[site+3]==='9') love = love + 'neun';
					this.setState({ text_output:love });
				}
			}
			else this.twodigit(love,site+2);
		}
		else this.threedigit(love,site+1);

	}


}

const GetInput = props => <div className="input-group">
  <input type="text" 
	className="form-control" 
	placeholder="Nummer" 
	value={props.value}
    onChange={props.update}
	onKeyDown={props.keydown}
	aria-describedby="sizing-addon2" />
</div>


export default Trans;
