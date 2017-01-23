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
              <br />
              <h3 className="blog-post-title">Net</h3>
              <p>電機四</p>
              <blockquote>
              	<font size='2'>負責整合整個頁面，做app的嵌核，還有bootstrap的維護，跟後端(很簡單的)。</font>
                <br />
                <strike><font size='1'>簡單來說大多時間都在處理bug跟製造新的bug</font></strike>
                <br />
              	<strike><font size='1'>因為頭撞到腦震盪拖延整組的進度</font></strike>
              </blockquote>

              <br />
              <h3 className="blog-post-title">Serena</h3>
              <p>圖資碩一</p>
              <blockquote>
                <font size='2'>負責前端bootstrap的設計、Tarot的維護以及報告。</font>
              </blockquote>

              <br />
              <h3 className="blog-post-title">Leo</h3>
              <p>電機三</p>
              <blockquote>
                <font size='2'>負責寫一些奇特的小APP例如留言板、網路書籤以及開發中的聊天室</font>
              </blockquote>
            </div> 
		);



    }
}export default AboutMe;