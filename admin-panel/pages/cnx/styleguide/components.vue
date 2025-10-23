<template>
  <div class="styleguide-section">

    <!-- Swiper 컴포넌트 -->
    <div class="component-section">
      <h3 class="section-title">AppSwiper</h3>
      <p class="section-description">
        스와이퍼 컴포넌트입니다.<br>
        autoplay와 애니메이션 속도, darkMode 옵션을 지원합니다.<br>
      </p>

      <div class="component-demo">
        <h4 class="demo-title">기본 사용법</h4>
        <div class="demo-content">
          <AppSwiper :effect="'fade'" :autoplay="5000">
            <picture>
              <source srcset="/assets/cnx/careers/slide_01.png" media="(min-width: 1024px)" />
              <source srcset="/assets/cnx/careers/slide_01_t.png" media="(min-width: 768px)" />
              <img src="/assets/cnx/careers/slide_01_m.png" alt="Life at Concentrix" />
            </picture>
            <picture>
              <source srcset="/assets/cnx/careers/slide_02.png" media="(min-width: 1024px)" />
              <source srcset="/assets/cnx/careers/slide_02_t.png" media="(min-width: 768px)" />
              <img src="/assets/cnx/careers/slide_02_m.png" alt="Our Operating Philosophies" />
            </picture>
            <picture>
              <source srcset="/assets/cnx/careers/slide_03.png" media="(min-width: 1024px)" />
              <source srcset="/assets/cnx/careers/slide_03_t.png" media="(min-width: 768px)" />
              <img src="/assets/cnx/careers/slide_03_m.png" alt="Our Culture" />
            </picture>
          </AppSwiper>
        </div>
        
        <div class="code-example">
          <h4 class="code-title">코드 예시</h4>
          <pre class="code-block"><code>&lt;AppSwiper :effect="'fade'" :autoplay="5000" /&gt;
  &lt;picture&gt;
    &lt;source srcset="/assets/cnx/careers/slide_01.png" media="(min-width: 1024px)" /&gt;
    &lt;source srcset="/assets/cnx/careers/slide_01_t.png" media="(min-width: 768px)" /&gt;
    &lt;img src="/assets/cnx/careers/slide_01_m.png" alt="Life at Concentrix" /&gt;
  &lt;/picture&gt;
  &lt;picture&gt;
    &lt;source srcset="/assets/cnx/careers/slide_02.png" media="(min-width: 1024px)" /&gt;
    &lt;source srcset="/assets/cnx/careers/slide_02_t.png" media="(min-width: 768px)" /&gt;
    &lt;img src="/assets/cnx/careers/slide_02_m.png" alt="Our Operating Philosophies" /&gt;
  &lt;/picture&gt;
  &lt;picture&gt;
    &lt;source srcset="/assets/cnx/careers/slide_03.png" media="(min-width: 1024px)" /&gt;
    &lt;source srcset="/assets/cnx/careers/slide_03_t.png" media="(min-width: 768px)" /&gt;
    &lt;img src="/assets/cnx/careers/slide_03_m.png" alt="Our Culture" /&gt;
  &lt;/picture&gt;
&lt;/AppSwiper&gt;  
</code></pre>
        </div>

        <div class="props-table">
          <h4 class="props-title">Props</h4>
          <table class="props-table-content">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Option</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>effect</td>
                <td>String</td>
                <td>'slide'</td>
                <td>null | 'slide' | 'fade'</td>
                <td>스와이퍼 효과</td>
              </tr>
              <tr>
                <td>speed</td>
                <td>Number</td>
                <td>400</td>
                <td>null | number</td>
                <td>애니메이션 속도 (ms)</td>
              </tr>
              <tr>
                <td>autoplay</td>
                <td>Number</td>
                <td>null</td>
                <td>null | number</td>
                <td>자동 재생 속도 (ms) / null시 자동 재생 비활성화</td>
              </tr>
              <tr>
                <td>darkMode</td>
                <td>Boolean</td>
                <td>false</td>
                <td>null | boolean</td>
                <td>다크 모드 / 사용 시 버튼, 페이지네이션 색상 흰색</td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </div>

    <!-- AppKeyVisual 컴포넌트 -->
    <div class="component-section">
      <h3 class="section-title">AppKeyVisual</h3>
      <p class="section-description">
        페이지 상단에 사용되는 키 비주얼 컴포넌트입니다. 반응형 이미지와 애니메이션 효과를 지원합니다.
      </p>
      
      <div class="component-demo">
        <h4 class="demo-title">기본 사용법</h4>
        <div class="demo-content">
          <AppKeyVisual 
            imageAlt="Style Guide Key Visual"
            :animationDuration="1500"
            imagePath="/assets/cnx/what-we-do/strategy-and-design/digital-advertising"
          />
        </div>
        
        <div class="code-example">
          <h4 class="code-title">코드 예시</h4>
          <pre class="code-block"><code>&lt;AppKeyVisual 
  imageAlt="Style Guide Key Visual"
  :animationDuration="1500"
  imagePath="/assets/cnx/whatwedo/strategyndesign/digitaladvertising"
/&gt;</code></pre>
        </div>
        
        <div class="props-table">
          <h4 class="props-title">Props</h4>
          <table class="props-table-content">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>imageAlt</td>
                <td>String</td>
                <td>''</td>
                <td>이미지 alt 텍스트</td>
              </tr>
              <tr>
                <td>animationDuration</td>
                <td>Number</td>
                <td>1000</td>
                <td>애니메이션 지속 시간 (ms)</td>
              </tr>
              <tr>
                <td>imagePath</td>
                <td>String</td>
                <td>''</td>
                <td>이미지 경로 (지정하지 않으면 현재 페이지 경로 사용)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- AppImgCont 컴포넌트 -->
    <div class="component-section">
      <h3 class="section-title">AppImgCont</h3>
      <p class="section-description">
        텍스트와 이미지를 함께 표시하는 컨텐츠 컴포넌트입니다. 반응형 레이아웃, reverse 옵션, 서브 아이템 기능을 지원합니다. 서브 아이템은 제목이 있는 경우와 없는 경우 모두 지원하며, 제목이 없는 경우 불릿 포인트로 표시됩니다.
      </p>
      
      <div class="component-demo">
        <h4 class="demo-title">기본 사용법</h4>
        <div class="demo-content">
          <AppImgCont 
            title="Sample Title"
            text="이것은 AppImgCont 컴포넌트의 기본 사용 예시입니다. 텍스트와 이미지가 함께 표시됩니다."
            imageName="DA01"
            imageAlt="Sample Image"
            imagePath="/assets/cnx/what-we-do/strategy-and-design/digital-advertising"
          />
        </div>
        
        <div class="code-example">
          <h4 class="code-title">코드 예시</h4>
          <pre class="code-block"><code>&lt;AppImgCont 
  title="Sample Title"
  text="이것은 AppImgCont 컴포넌트의 기본 사용 예시입니다."
  imageName="DA01"
  imageAlt="Sample Image"
  imagePath="/assets/cnx/whatwedo/strategyndesign/digitaladvertising"
/&gt;</code></pre>
        </div>
        
        <h4 class="demo-title">Reverse 옵션</h4>
        <div class="demo-content">
          <AppImgCont 
            title="Reverse Layout"
            text="reverse 옵션을 true로 설정하면 태블릿 이상에서 이미지와 텍스트의 위치가 바뀝니다."
            imageName="DA02"
            imageAlt="Reverse Layout Image"
            :reverse="true"
            imagePath="/assets/cnx/what-we-do/strategy-and-design/digital-advertising"
          />
        </div>
        
        <div class="code-example">
          <h4 class="code-title">코드 예시</h4>
          <pre class="code-block"><code>&lt;AppImgCont 
  title="Reverse Layout"
  text="reverse 옵션을 true로 설정하면..."
  imageName="DA02"
  imageAlt="Reverse Layout Image"
  :reverse="true"
  imagePath="/assets/cnx/whatwedo/strategyndesign/digitaladvertising"
/&gt;</code></pre>
        </div>
        
        <h4 class="demo-title">Heading Level 옵션</h4>
        <div class="demo-content">
          <AppImgCont 
            title="Heading Level h3"
            text="headingLevel 옵션을 사용하여 제목의 HTML 태그 레벨을 설정할 수 있습니다. 서브 아이템의 제목은 자동으로 다음 레벨로 설정됩니다."
            imageName="DA01"
            imageAlt="Heading Level Image"
            headingLevel="h3"
            imagePath="/assets/cnx/what-we-do/strategy-and-design/digital-advertising"
          />
        </div>
        
        <div class="code-example">
          <h4 class="code-title">코드 예시</h4>
          <pre class="code-block"><code>&lt;AppImgCont 
  title="Heading Level h3"
  text="headingLevel 옵션을 사용하여..."
  imageName="DA01"
  imageAlt="Heading Level Image"
  headingLevel="h3"
  imagePath="/assets/cnx/whatwedo/strategyndesign/digitaladvertising"
/&gt;</code></pre>
        </div>
        
        <h4 class="demo-title">Align Top 옵션</h4>
        <div class="demo-content">
          <AppImgCont 
            title="Align Top Layout"
            text="alignTop 옵션을 true로 설정하면 태블릿 이상에서 이미지와 텍스트박스가 상단 정렬됩니다."
            imageName="DA01"
            imageAlt="Align Top Image"
            :alignTop="true"
            imagePath="/assets/cnx/what-we-do/strategy-and-design/digital-advertising"
          />
        </div>
        
        <div class="code-example">
          <h4 class="code-title">코드 예시</h4>
          <pre class="code-block"><code>&lt;AppImgCont 
  title="Align Top Layout"
  text="alignTop 옵션을 true로 설정하면..."
  imageName="DA01"
  imageAlt="Align Top Image"
  :alignTop="true"
  imagePath="/assets/cnx/whatwedo/strategyndesign/digitaladvertising"
/&gt;</code></pre>
        </div>
        
        <h4 class="demo-title">서브 아이템 기능 (제목 있음)</h4>
        <div class="demo-content">
          <AppImgCont 
            title="서브 아이템이 있는 레이아웃"
            text="서브 아이템에 제목이 있는 경우, 제목과 리스트가 함께 표시되며 불릿 포인트는 제거됩니다."
            imageName="DA01"
            imageAlt="Sub Items Layout Image"
            :subItems="subItemsWithTitles"
            imagePath="/assets/cnx/what-we-do/strategy-and-design/digital-advertising"
          />
        </div>
        
        <div class="code-example">
          <h4 class="code-title">코드 예시</h4>
          <pre class="code-block"><code>&lt;script setup&gt;
import { computed } from 'vue'

const subItemsWithTitles = computed(() => [
  { 
    title: '서브타이틀 1', 
    listItems: ['첫 번째 서브 아이템의 설명입니다.', '추가 설명 텍스트입니다.'] 
  },
  { 
    title: '서브타이틀 2', 
    listItems: ['두 번째 서브 아이템의 설명입니다.'] 
  }
])
&lt;/script&gt;

&lt;template&gt;
  &lt;AppImgCont 
    title="서브 아이템이 있는 레이아웃"
    text="서브 아이템에 제목이 있는 경우..."
    imageName="DA01"
    imageAlt="Sub Items Layout Image"
    :subItems="subItemsWithTitles"
    imagePath="/assets/cnx/what-we-do/strategy-and-design/digital-advertising"
  /&gt;
&lt;/template&gt;</code></pre>
        </div>
        
        <h4 class="demo-title">서브 아이템 기능 (제목 없음)</h4>
        <div class="demo-content">
          <AppImgCont 
            title="불릿 포인트 리스트"
            text="서브 아이템에 제목이 없는 경우, 불릿 포인트로 표시됩니다."
            imageName="DA01"
            imageAlt="Bullet Points Image"
            :subItems="subItemsWithoutTitles"
            imagePath="/assets/cnx/what-we-do/strategy-and-design/digital-advertising"
          />
        </div>
        
        <div class="code-example">
          <h4 class="code-title">코드 예시</h4>
          <pre class="code-block"><code>&lt;script setup&gt;
import { computed } from 'vue'

const subItemsWithoutTitles = computed(() => [
  { listItems: ['첫 번째 불릿 포인트입니다.'] },
  { listItems: ['두 번째 불릿 포인트입니다.'] },
  { listItems: ['세 번째 불릿 포인트입니다.'] }
])
&lt;/script&gt;

&lt;template&gt;
  &lt;AppImgCont 
    title="불릿 포인트 리스트"
    text="서브 아이템에 제목이 없는 경우..."
    imageName="DA01"
    imageAlt="Bullet Points Image"
    :subItems="subItemsWithoutTitles"
    imagePath="/assets/cnx/what-we-do/strategy-and-design/digital-advertising"
  /&gt;
&lt;/template&gt;</code></pre>
        </div>
        
        <div class="props-table">
          <h4 class="props-title">Props</h4>
          <table class="props-table-content">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>title</td>
                <td>String</td>
                <td>''</td>
                <td>제목 텍스트 (HTML 태그 지원)</td>
              </tr>
              <tr>
                <td>text</td>
                <td>String</td>
                <td>''</td>
                <td>설명 텍스트 (HTML 태그 지원)</td>
              </tr>
              <tr>
                <td>imageName</td>
                <td>String</td>
                <td>''</td>
                <td>이미지 파일명 (확장자 제외)</td>
              </tr>
              <tr>
                <td>imageAlt</td>
                <td>String</td>
                <td>''</td>
                <td>이미지 alt 텍스트</td>
              </tr>
              <tr>
                <td>reverse</td>
                <td>Boolean</td>
                <td>false</td>
                <td>태블릿 이상에서 레이아웃 반전</td>
              </tr>
              <tr>
                <td>imagePath</td>
                <td>String</td>
                <td>''</td>
                <td>이미지 경로 (지정하지 않으면 현재 페이지 경로 사용)</td>
              </tr>
              <tr>
                <td>headingLevel</td>
                <td>String</td>
                <td>'h2'</td>
                <td>제목의 HTML 태그 레벨 (h1~h6)</td>
              </tr>
              <tr>
                <td>alignTop</td>
                <td>Boolean</td>
                <td>false</td>
                <td>태블릿 이상에서 상단 정렬</td>
              </tr>
              <tr>
                <td>subItems</td>
                <td>Array</td>
                <td>[]</td>
                <td>서브 아이템 배열. 각 아이템은 { title?, listItems } 형태. title이 있으면 제목+리스트, 없으면 불릿 포인트</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- AppSubCont 컴포넌트 -->
    <div class="component-section">
      <h3 class="section-title">AppSubCont</h3>
      <p class="section-description">
        상단 타이틀 영역과 하단 이미지 영역으로 구성된 서브 컨텐츠 컴포넌트입니다. 스크롤 애니메이션과 반응형 이미지 처리를 지원합니다.
      </p>
      
      <div class="component-demo">
        <h4 class="demo-title">기본 사용법</h4>
        <div class="demo-content">
          <AppSubCont 
            title="AppSubCont 컴포넌트<br>데모"
            description="상단 타이틀 영역과 하단 이미지 영역으로 구성된<br>서브 컨텐츠 컴포넌트입니다.<br>스크롤 애니메이션과 반응형 이미지 처리를 지원합니다."
            imageName="subContImg"
            imageAlt="AppSubCont 데모 이미지"
            imagePath="/assets/cnx/what-we-do/strategy-and-design/digital-advertising"
          />
        </div>
        
        <div class="code-example">
          <h4 class="code-title">코드 예시</h4>
          <pre class="code-block"><code>&lt;AppSubCont 
  title="AppSubCont 컴포넌트&lt;br&gt;데모"
  description="상단 타이틀 영역과 하단 이미지 영역으로 구성된&lt;br&gt;서브 컨텐츠 컴포넌트입니다."
  imageName="subContImg"
  imageAlt="AppSubCont 데모 이미지"
  imagePath="/assets/cnx/whatwedo/strategyndesign/digitaladvertising"
/&gt;</code></pre>
        </div>
        
        <div class="props-table">
          <h4 class="props-title">Props</h4>
          <table class="props-table-content">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>title</td>
                <td>String</td>
                <td>''</td>
                <td>제목 텍스트 (HTML 태그 지원)</td>
              </tr>
              <tr>
                <td>description</td>
                <td>String</td>
                <td>''</td>
                <td>설명 텍스트 (HTML 태그 지원)</td>
              </tr>
              <tr>
                <td>imageName</td>
                <td>String</td>
                <td>''</td>
                <td>이미지 파일명 (확장자 제외)</td>
              </tr>
              <tr>
                <td>imageAlt</td>
                <td>String</td>
                <td>''</td>
                <td>이미지 alt 텍스트</td>
              </tr>
              <tr>
                <td>imagePath</td>
                <td>String</td>
                <td>''</td>
                <td>이미지 경로 (지정하지 않으면 현재 페이지 경로 사용)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    
    <!-- AppCardList 컴포넌트 -->
    <div class="component-section">
      <h3 class="section-title">AppCardList</h3>
      <p class="section-description">
        제목과 설명으로 이루어진 카드 목록을 가로/반응형 레이아웃으로 표시합니다. 스크롤 애니메이션이 적용됩니다.
      </p>
      
      <div class="component-demo">
        <h4 class="demo-title">기본 사용법</h4>
        <div class="demo-content">
          <AppCardList
            title="AppCardList 컴포넌트 데모 (입력을 할 경우에만 출력이 됩니다.)"
            :items="[
              { id: 1, title: '카드 1', description: 'pc에서는 카드의 개수만큼 width / 개수 값이 적용됩니다.' },
              { id: 2, title: '카드 2', description: 'tablet 에서는 width 100% / 3 값이 적용되며 가운대로 정렬이 됩니다.' },
              { id: 3, title: '카드 3', description: 'Mobile에서는 width 100% 값이 적용됩니다.' }
            ]"
          />
        </div>
        
        <div class="code-example">
          <h4 class="code-title">코드 예시</h4>
          <pre class="code-block"><code>&lt;AppCardList
  title="AppCardList 컴포넌트 데모" (입력을 할 경우에만 출력이 됩니다.)

  :items="[
  { id: 1, title: '카드 1', description: 'pc에서는 카드의 개수만큼 width / 개수 값이 적용됩니다.' },
  { id: 2, title: '카드 2', description: 'tablet에서는 width 100% / 3 값이 적용되며 가운대로 정렬이 됩니다.' },
  { id: 3, title: '카드 3', description: 'Mobile에서는 width 100% 값이 적용됩니다.' }
  ]"
/&gt;</code></pre>
        </div>

        <h4 class="demo-title">itemHeadTag 옵션 (title이 없으면 자동으로 h2로 출력되며, 다른 태그로 출력이 필요할 시 itemHeadTag 옵션을 사용하여 원하는 태그로 출력할 수 있습니다.)</h4>
        <div class="demo-content">
          <AppCardList
            itemHeadTag="h2"
            :items="[
              { id: 1, title: '카드 1', description: 'pc에서는 카드의 개수만큼 width / 개수 값이 적용됩니다.' },
              { id: 2, title: '카드 2', description: 'tablet 에서는 width 100% / 3 값이 적용되며 가운대로 정렬이 됩니다.' },
              { id: 3, title: '카드 3', description: 'Mobile에서는 width 100% 값이 적용됩니다.' }
            ]"
          />
        </div>
        
        <div class="code-example">
          <h4 class="code-title">코드 예시</h4>
          <pre class="code-block"><code>&lt;AppCardList
  itemHeadTag="h2"
  :items="[
  { id: 1, title: '카드 1', description: 'pc에서는 카드의 개수만큼 width / 개수 값이 적용됩니다.' },
  { id: 2, title: '카드 2', description: 'tablet에서는 width 100% / 3 값이 적용되며 가운대로 정렬이 됩니다.' },
  { id: 3, title: '카드 3', description: 'Mobile에서는 width 100% 값이 적용됩니다.' }
  ]"
/&gt;</code></pre>
        </div>
        
        <div class="props-table">
          <h4 class="props-title">Props</h4>
          <table class="props-table-content">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>title</td>
                <td>String</td>
                <td>''</td>
                <td>리스트 상단 제목 텍스트</td>
              </tr>
              <tr>
                <td>items</td>
                <td>Array</td>
                <td>[]</td>
                <td>카드 아이템 배열. 각 아이템은 { id, title, description } 형태</td>
              </tr>
              <tr>
                <td>noMarginBottom</td>
                <td>Boolean</td>
                <td>false</td>
                <td>하단 여백 제거</td>
              </tr>
              <tr>
                <td>noMb</td>
                <td>Boolean</td>
                <td>false</td>
                <td>하단 여백 제거 (동일 옵션)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AppKeyVisual from '~/components/cnx/AppKeyVisual.vue'
import AppImgCont from '~/components/cnx/AppImgCont.vue'
import AppSubCont from '~/components/cnx/AppSubCont.vue'
import AppSwiper from '~/components/cnx/AppSwiper.vue'
import AppCardList from '~/components/cnx/AppCardList.vue'

// AppImgCont 서브 아이템 데이터 (제목 있음)
const subItemsWithTitles = computed(() => [
  { 
    title: '서브타이틀 1', 
    listItems: ['첫 번째 서브 아이템의 설명입니다.', '추가 설명 텍스트입니다.'] 
  },
  { 
    title: '서브타이틀 2', 
    listItems: ['두 번째 서브 아이템의 설명입니다.'] 
  }
])

// AppImgCont 서브 아이템 데이터 (제목 없음)
const subItemsWithoutTitles = computed(() => [
  { listItems: ['첫 번째 불릿 포인트입니다.'] },
  { listItems: ['두 번째 불릿 포인트입니다.'] },
  { listItems: ['세 번째 불릿 포인트입니다.'] }
])
</script>

<style lang="scss" scoped>
.styleguide-section {
  padding: 20px 0;
}

.component-section {
  margin-bottom: 60px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: $p-blue;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid $n-gray;
}

.section-description {
  font-size: 16px;
  color: $n-dark-gray;
  margin-bottom: 30px;
  line-height: 1.6;
}

.component-demo {
  margin-bottom: 40px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.demo-title {
  font-size: 18px;
  font-weight: 600;
  color: $d-black;
  margin-bottom: 16px;
}

.demo-content {
  margin-bottom: 24px;
}

.code-example {
  margin-bottom: 30px;
}

.code-title {
  font-size: 16px;
  font-weight: 600;
  color: $d-black;
  margin-bottom: 12px;
}

.code-block {
  background: $gray-3;
  border: 1px solid $gray-2;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  
  code {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 14px;
    line-height: 1.5;
    color: $d-black;
  }
}

.props-table {
  margin-top: 30px;
}

.props-title {
  font-size: 16px;
  font-weight: 600;
  color: $d-black;
  margin-bottom: 12px;
}

.props-table-content {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: rem(8);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  thead {
    background: $gray-3;
    
    th {
      font-size: 14px;
      font-weight: 600;
      color: $d-black;
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid $gray-2;
      
      &:first-child {
        border-top-left-radius: 8px;
      }
      
      &:last-child {
        border-top-right-radius: 8px;
      }
    }
  }
  
  tbody {
    tr {
      border-bottom: 1px solid $gray-2;
      
      &:last-child {
        border-bottom: none;
      }
    }
    
    td {
      font-size: 14px;
      color: $n-dark-gray;
      padding: 12px 16px;
      
      &:first-child {
        font-weight: 500;
        color: $d-black;
      }
      
      &:nth-child(2) {
        color: $p-blue;
      }
    }
  }
}

// 반응형
@include tablet {
  .styleguide-section {
    padding: 16px 0;
  }
  
  .component-section {
    margin-bottom: 40px;
  }
  
  .demo-content {
    margin-bottom: 20px;
  }
  
  .code-block {
    padding: 12px;
  }
  
  .props-table-content {
    thead th,
    tbody td {
      padding: 10px 12px;
    }
  }
}

@media (max-width: 767px) {
  .styleguide-section {
    padding: 12px 0;
  }
  
  .component-section {
    margin-bottom: 30px;
  }
  
  .demo-content {
    margin-bottom: 20px;
  }
  
  .code-block {
    padding: 10px;
    
    code {
      font-size: 12px;
    }
  }
  
  .props-table-content {
    font-size: 12px;
    
    thead th,
    tbody td {
      padding: 8px 10px;
    }
  }
}
</style>
