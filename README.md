<div align="center">
  <a href="https://geon1999.github.io/Netflix-clone/">
    <img height="120" src="/preview/logo.png" />
    <br />
    <a display="block" href="https://geon1999.github.io/Netflix-clone/">넷플릭스 클론으로 이동</a>
  </a>
   <br /><br /> <br /><br />
  <img height="500" src="preview/Home.gif" />
</div>

</br>

## Preview

> Home

- [API 사이트](https://developers.themoviedb.org/3/getting-started/introduction, "api link") 에서 제공 해주는 api 를 fetch 하여 영화들의 정보를 얻어옴

  - `ReactQuery` 의 `useQuery` 를 통해 data 를 get 함

  </br>

  #### home 내부에 사용된 componet

  </br>

  _Slider_
  <div align="center">
    <img height="500" src="preview/Slider.gif" />
  </div>

  _Detail_
  <div align="center">
    <img height="500" src="preview/Detail.gif" />
  </div>

```
// App.tsx
<Route path="/" element={<Home />}>
  <Route path="/movies/:movieId" element={<div>Movie</div>} />
</Route>
```

- `App.tsx` 에서 위와 같이 home `route` 내에 movie detail 을 위한 `route` 를 생성함
- 영화 포스터 클릭시 해당 `/movis/클릭된 영화 id` 로 이동되고 이동시 `movieId` 를 통해 fetch 하고 영화 정보를 얻옴
- 클릭시 `Framer Motion` 을 통해 애니메이션을 추가함
  - `movieId` 와 해당 `slider` 의 이름을 합쳐 `layoutId` 기입하고 `layoutId` 를 통해 `slider` 의 영화 포스터 박스 -> `movie detail` 박스가 이어지도록 애니메이션 구현

</hr>

> Series

- Home 과 유사하게 작동함
<div align="center">
  <img height="500" src="preview/Series.gif" />
</div>

</hr>

> Search

- `useForm` 을 통해 input 에 기입된 키워드를 값으로 받고 키워드를 통해 영화와 시리즈의 data 를 fetch 로 받음
<div align="center">
 <img height="500" src="preview/Search.gif" />
</div>

<hr />

## Built with

React / styled-components / Framer Motion / ReactQuery
