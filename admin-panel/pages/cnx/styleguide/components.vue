<template>
  <div class="styleguide-section">
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
            imagePath="/assets/cnx/whatwedo/strategyndesign/digitaladvertising"
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
        텍스트와 이미지를 함께 표시하는 컨텐츠 컴포넌트입니다. 반응형 레이아웃, reverse 옵션, 그리고 서브 아이템 기능을 지원합니다. 서브 아이템이 있을 때는 이미지와 텍스트박스의 정렬이 자동으로 top으로 변경됩니다.
      </p>
      
      <div class="component-demo">
        <h4 class="demo-title">기본 사용법</h4>
        <div class="demo-content">
          <AppImgCont 
            title="Sample Title"
            text="이것은 AppImgCont 컴포넌트의 기본 사용 예시입니다. 텍스트와 이미지가 함께 표시됩니다."
            imageName="DA01"
            imageAlt="Sample Image"
            imagePath="/assets/cnx/whatwedo/strategyndesign/digitaladvertising"
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
            imagePath="/assets/cnx/whatwedo/strategyndesign/digitaladvertising"
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
        
        <h4 class="demo-title">서브 아이템 기능</h4>
        <div class="demo-content">
          <AppImgCont 
            title="서브 아이템이 있는 레이아웃"
            text="서브 아이템이 있을 때는 이미지와 텍스트박스의 정렬이 자동으로 top으로 변경됩니다."
            imageName="DA01"
            imageAlt="Sub Items Layout Image"
            :subItems="[
              { title: '서브타이틀 1', text: '첫 번째 서브 아이템의 설명 텍스트입니다.' },
              { title: '서브타이틀 2', text: '두 번째 서브 아이템의 설명 텍스트입니다.' },
              { title: '서브타이틀 3', text: '세 번째 서브 아이템의 설명 텍스트입니다.' }
            ]"
            imagePath="/assets/cnx/whatwedo/strategyndesign/digitaladvertising"
          />
        </div>
        
        <div class="code-example">
          <h4 class="code-title">코드 예시</h4>
          <pre class="code-block"><code>&lt;AppImgCont 
  title="서브 아이템이 있는 레이아웃"
  text="서브 아이템이 있을 때는..."
  imageName="DA01"
  imageAlt="Sub Items Layout Image"
  :subItems="[
    { title: '서브타이틀 1', text: '첫 번째 서브 아이템의 설명 텍스트입니다.' },
    { title: '서브타이틀 2', text: '두 번째 서브 아이템의 설명 텍스트입니다.' },
    { title: '서브타이틀 3', text: '세 번째 서브 아이템의 설명 텍스트입니다.' }
  ]"
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
                <td>제목 텍스트</td>
              </tr>
              <tr>
                <td>text</td>
                <td>String</td>
                <td>''</td>
                <td>설명 텍스트</td>
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
                <td>subItems</td>
                <td>Array</td>
                <td>[]</td>
                <td>서브 아이템 배열 (title, text 속성을 가진 객체들의 배열)</td>
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
            imagePath="/assets/cnx/whatwedo/strategyndesign/digitaladvertising"
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
  </div>
</template>

<script setup>
import AppKeyVisual from '~/components/cnx/AppKeyVisual.vue'
import AppImgCont from '~/components/cnx/AppImgCont.vue'
import AppSubCont from '~/components/cnx/AppSubCont.vue'
</script>

<style lang="scss" scoped>
@use '~/layouts/scss/cnx.scss' as *;
@use '~/layouts/scss/cnx/_variables' as *;
@use '~/layouts/scss/cnx/_mixins' as *;
@use '~/layouts/scss/cnx/_functions' as *;

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
