console.clear();

(function () {
  "use strict";

  const util = {
    localStorage: {
      set(prop, value) {
        localStorage.setItem(prop, JSON.stringify(value));
      },
      get(prop) {
        let data =
        localStorage[prop] === undefined ?
        false :
        JSON.parse(localStorage[prop]);
        return data;
      },
      clear(prop) {
        localStorage.removeItem(prop);
        console.log(`${prop} cleared from localStorage.`);
      } },

    formatString(string) {
      let label = string.
      replace(/[0-9]/g, "").
      replace(/ /g, "-").
      replace(/'/g, "").
      replace(/:/g, "");
      while (label.charAt(0) === "-") {
        label = label.substr(1);
      }
      return label;
    } };


  const trailer = {
    movie: null,
    trailer: null,

    removeTrailers() {
      const trailers = document.querySelectorAll(".trailer-container.active");
      trailers.forEach(trailer => {
        trailer.innerHTML = "";
      });
    },

    buildTemplate(movieId, trailerId) {
      const trailerTemplate = document.getElementById("trailer-template");
      const source = trailerTemplate.innerHTML;
      const template = Handlebars.compile(source);
      const context = {
        trailer: this.trailer };

      const html = template(context);

      this.insertTemplate(html);
    },

    insertTemplate(html) {
      const container = document.querySelector(
      `.day-outer-container[data-movie=${this.movie}]`);

      const trailer = container.querySelector(".trailer-container");

      this.toggleContainerClasses(container);

      trailer.classList.add("active");
      trailer.innerHTML = html;

      this.bindCloseIcon();
    },

    toggleContainerClasses(container = null) {
      const currentActive = document.querySelector(
      ".day-outer-container.trailer");

      if (currentActive) currentActive.classList.remove("trailer");
      if (container) container.classList.add("trailer");
    },

    bindCloseIcon() {
      const close = document.querySelector(".close-icon");
      close.addEventListener("click", () => {
        this.removeTrailers();
        this.toggleContainerClasses();
      });
    },

    init(movieId, trailerId) {
      this.removeTrailers();

      this.movie = movieId;
      this.trailer = trailerId;

      this.buildTemplate();
    } };


  const helpers = {
    init() {
      Handlebars.registerHelper("next", function (value) {
        const nextVal = parseInt(value) + 1;
        return nextVal < 10 ? `0${nextVal}` : nextVal;
      });

      Handlebars.registerHelper("prev", function (value) {
        const prevVal = parseInt(value) - 1;
        return prevVal < 10 ? `0${prevVal}` : prevVal;
      });
    } };


  const con = {
    moviesDatabase: null,
    fetch(table) {
      return firebase.
      database().
      ref(`/${table}/`).
      once("value").
      then(data => {
        return data.val();
      });
    },

    post(movieId, type) {
      let movieData;
      firebase.
      database().
      ref(`/tracking/${movieId - 1}`).
      once("value").
      then(data => {
        movieData = data.val();
        movieData.tracking[type]++;

        firebase.
        database().
        ref(`/tracking/${movieId - 1}`).
        set(movieData);
      });
    },

    init() {
      const config = {
        apiKey: "AIzaSyDj19pdN2v4FPRgK89BRHOHUNf4T8eLwKY",
        authDomain: "horror-calendar-2017.firebaseapp.com",
        databaseURL: "https://horror-calendar-2017.firebaseio.com",
        projectId: "horror-calendar-2017",
        storageBucket: "horror-calendar-2017.appspot.com" };


      firebase.initializeApp(config);
      this.database = firebase.database();
    } };

  con.init();

  const calendar = {
    themes: null,
    movies: null,
    allContainers: null,
    id: 1,
    index: 0,

    fetchMovies() {
      return con.fetch("movies");
    },

    fetchThemes() {
      return con.fetch("themes");
    },

    loadImage(path, ref) {
      const img = document.createElement("img");
      img.src = `http://yuschick.github.io/31-Nights-of-Horror-2017/${path}`;

      img.addEventListener(
      "load",
      () => {
        this.allContainers[ref].style.backgroundImage = `url(http://yuschick.github.io/31-Nights-of-Horror-2017/${path})`;
        this.allContainers[ref].style.backgroundSize = "cover";
        this.allContainers[ref].classList.add("loaded");
      },
      false);

    },

    buildMovieObject(movie) {
      movie.id = this.id < 10 ? `0${this.id}` : this.id;
      movie.label = util.formatString(movie.title);

      movie.date = {};
      movie.date.theme = this.themes[this.index].theme;
      movie.date.day = this.themes[this.index].day;
      movie.date.happyhalloween = this.id === 31 ? "Happy Halloween!" : false;

      movie.arrows = {};
      movie.arrows.top = this.id === 1 ? false : true;
      movie.arrows.bottom = this.id === 31 ? false : true;

      return movie;
    },

    bindEvents() {
      const playIcons = document.querySelectorAll(".play-icon-container");
      playIcons.forEach(icon => {
        icon.addEventListener("click", function () {
          const movieLabel = this.attributes["data-movie"].value;
          const trailerId = this.attributes["data-trailer"].value;
          const movieId = this.attributes["data-id"].value.replace(/^0/, "");
          trailer.init(movieLabel, trailerId);

          con.post(movieId, "trailer");
        });
      });

      const streamIcons = document.querySelectorAll(".stream-icon");
      streamIcons.forEach(icon => {
        icon.addEventListener("click", function () {
          const movieId = this.attributes["data-id"].value;
          const type = this.attributes["data-type"].value;
          con.post(movieId, type);
        });
      });
    },

    buildTemplate(context) {
      const movieTemplate = document.getElementById("movie-template");
      const source = movieTemplate.innerHTML;
      const template = Handlebars.compile(source);
      const html = template(context);

      this.insertTemplate(html);
    },

    moveToDate() {
      const rightNow = new Date();
      const month = rightNow.getMonth();

      if (month === 9) {
        let date = rightNow.getDate();
        let section;
        let pos;

        if (date < 10) {
          date = `0${date}`;
        }

        section = document.getElementById(date);
        pos = section.offsetTop;
        window.scroll(0, pos - 25);
      }
    },

    insertTemplate(html) {
      const main = document.getElementsByTagName("main")[0];
      main.innerHTML += html;
    },

    buildAllMovies() {
      let html;
      let containerID;

      this.movies.map(movie => {
        let context = this.buildMovieObject(movie);
        this.buildTemplate(context);

        this.allContainers = document.querySelectorAll(".day-outer-container");
        containerID = this.id - 1;
        this.loadImage(movie.images.backdrop, containerID);

        this.index++;
        if (this.index > 6) this.index = 0;

        this.id++;
      });

      this.moveToDate();
    },

    init() {
      Promise.all([this.fetchMovies(), this.fetchThemes()]).then(data => {
        this.movies = data[0];
        this.themes = data[1];

        const main = document.getElementsByTagName("main")[0];
        main.innerHTML = "";

        this.buildAllMovies();
        this.bindEvents();
      });
    } };


  helpers.init();
  calendar.init();
})();