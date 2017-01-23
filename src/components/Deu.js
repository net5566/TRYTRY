import React, { Component } from 'react';

class Deu extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

render() {

  return (

            <div className="blog-post">
              <h2 className="blog-post-title">Deutschland 德國</h2>
                <p className="blog-post-meta">簡介 from <a href="https://zh.wikipedia.org/wiki/%E5%BE%B7%E5%9B%BD">wiki</a></p>
              <p>德意志聯邦共和國（德語：Bundesrepublik Deutschland）簡稱德國（德語：Deutschland），是一個位於歐洲的聯邦議會共和制國家，國家元首為聯邦總統，政府首腦為聯邦總理。它由16個邦組成，首都與最大城市為柏林。其國土面積約35.7萬平方公里，南北距離為876公里，東西相距640公里，從北部的北海與波羅的海延伸至南部的艾爾卑斯山。氣候溫和，季節分明。德國人口約8,180萬，為歐洲聯盟中人口最多的國家，也是世界第二大移民目的地，僅次於美國。</p>
              <blockquote>
                <p>什麼?你以為我要把wiki整個copy下來? <strong>這你就錯了</strong> <strike>來談些有趣的吧</strike></p>
              </blockquote>
              <h3>巴伐利亞 Bayern</h3>
                <p className="blog-post-meta">巴伐利亞相關資料可至<a href="https://zh.wikipedia.org/wiki/%E5%B7%B4%E4%BC%90%E5%88%A9%E4%BA%9A">wiki</a>查詢</p>
                <p> 德國的一些介紹跟文化特色都很容易在網路上找到。 </p>
                <p> 在這裡提一下，德國裡面比較不同的世界---巴伐利亞。 </p>
                <p> 大家都知道，在台灣會戰南北，而在德國，也會戰東西德。 </p>
                <p> 最特別的就是南部的巴伐利亞邦，巴伐利亞邦為德國最富庶的地區，除了經濟實力雄厚外，巴伐利亞人也常常強調自己地區文化上與一般其他普魯士各邦的德國人的不同。</p>
                <blockquote>
                  <strike> <font size='1'>所以屬於西德的巴伐利亞在戰東西德的同時，另一邊還要戰南北呢XD </font></strike>
                </blockquote>

            </div> 
    );


/*

	return <div> 
	<h2> 巴伐利亞 Bayern</h2>
	<p> 德國的一些介紹跟文化特色都很容易在網路上找到。 </p>
	<p> 在這裡提一下，德國裡面比較不同的世界---巴伐利亞。 </p>
  <p> 大家都知道，在台灣會戰南北，而在德國，也會戰東西德， </p>
  <p> 最特別的就是南部的巴伐利亞邦，巴伐利亞邦為德國最富庶的地區，</p>
  <p> 除了經濟實力雄厚外，巴伐利亞人也常常強調自己地區文化上與一般</p>
  <p> 與其他普魯士各邦的德國人的不同。</p>
  <p> 所以屬於西德的巴伐利亞在戰東西德的同時，另一邊還要戰南北呢XD</p>
	</div>;
*/


    }
}export default Deu;