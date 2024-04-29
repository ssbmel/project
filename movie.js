const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTI2NzY3Mzk4NGFkOThiNjIxM2EwMzY0YjI4MDk4ZCIsInN1YiI6IjY2Mjc5MGQ4MjljNjI2MDE3ZTRhNGY2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JambA0Hed0M69OX92M-IyIDz41YC28k5ZmvmpU-gqV8'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    const movieData = response.results; //영화 데이터를 가져오기 위해 변수선언

    //html에 적용할 위치(id이름) 가져오기
    const movieCard = document.getElementById("card");

    //html에 들어갈 영화 카드 탬플릿 + 검색 값 세팅 
    function movieList(val = "") {
      movieCard.innerHTML = movieData.map((data) => {
        if(data.title.toLowerCase().includes(val.toLowerCase())) {
          return`
          <div class="cardBox" onclick="alertCard(${data.id})">
              <div class="flip">
                <div class="front">
                <img src='https://image.tmdb.org/t/p/w300${data.poster_path}' alt="${data.original_title}">
                <h3>${data.original_title}</h3>
                </div>
                <div class="back">
                <p>${data.overview}</p>
                <p>평점 : ${data.vote_average}</p>
                </div>
              </div>    
          </div>`;
        }
      })
      .join("") //html 배열의 요소를 연결
    }
    movieList(); //함수 호출

    //검색한 값 가져오기 + 검색한 영화 출력하기
    const searchInput = document.getElementById('search');
    const searchBtn = document.getElementById('btn');

    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = searchInput.value;
      movieList(val);
    });
})


  function alertCard(id) {
    alert(`영화 ID : ${id}`);
  }
