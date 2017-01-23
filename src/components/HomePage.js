import React, { Component } from 'react';


class HomePage extends Component {
  render() {
    return  (
    		<div className="blog-post">
              <h2 className="blog-post-title">HomePage</h2>

              <p>目前本網站<strong>開發中</strong></p>
              <blockquote>
                <p>開發中的功能</p>
                <ul>
                	<li>會員功能（並整合其他功能）</li>
                	<li>整理頁面</li>
                	<li>聊天室</li>
                	<li>其他小APP</li>
                	<li><strike>這一切都要等到過年後了</strike></li>
              	</ul>
                <p className="blog-post-meta">January 22, 2017 by <a href="#">Net</a></p>
              </blockquote>

            </div> );

  }
}

export default HomePage;
