import React, { Component } from 'react';

class AboutMe extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  /*
  	 <div> 
	<h2> Net </h2>
	<p> 對德文很有興趣，會在這裡分享學習德文的心得和資源 </p>
	<p> 同時也是自己在WebProgramming上的實踐 </p>
	</div>;
  */

render() {

	return (

            <div className="blog-post">
              <h2 className="blog-post-title">Über mich 關於我</h2>

              <p>我是Net</p>
              <p>目前還是學生，興趣是資訊相關、日文以及德文，此網站作為一個Javascript前後端練習的實現，同時也是有鑒於台灣學習日文的風氣已經很興盛，自己也想要做個德文學習網站，來推廣一下德語。</p>
              <blockquote>
              	<font size='1'>可是為什麼做了老半天網站還只是像個改模板的小東西QAQ </font>
              	<strike><font size='1'>說要弄前後端結果根本都在玩CSS啊</font></strike>
              </blockquote>
            </div> 
		);



    }
}export default AboutMe;