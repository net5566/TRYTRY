import React, { Component } from 'react';


class HomePage extends Component {
  render() {
    return  (
    		<div className="blog-post">
              <h2 className="blog-post-title">HomePage</h2>

              <p>由於本網站仍<strong>開發中</strong> 功能不齊全請見諒</p>
              <blockquote>
                <p>嗚嗚弄一個<strong>Bootstrap</strong>竟然會遇到<em>如此大量</em>的問題，果然我還是太菜了Orz </p>
                <ul>
                	<li>首先是自己太過愚笨，貼上template後忘記要改成className</li>
                	<li>再來發現Bootstrap的CSS完全吃不到</li>
                	<li>於是我想用Webpack把CSS跟jsx包在一起，結果還是吃不到</li>
                	<li>最後用從網路上引入的方式就吃到了</li>
                	<li><strike>我還在懷疑我是不是對於路徑理解出了什麼問題 (反正暫時解決了)</strike></li>
              	</ul>
                <p className="blog-post-meta">November 30, 2016 by <a href="#">Net</a></p>
              </blockquote>

            </div> );

  }
}

export default HomePage;
