import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  // params 중에서 특정 키워드 뒤에 오는 값을 가져옴 /search?keyworld="값"
  console.log(keyword);
  return null;
}

export default Search;
