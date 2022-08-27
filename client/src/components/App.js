import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import MovieDetail from './views/MovieDetail/MovieDetail';
import FavoritePage from './views/FavoritePage/FavoritePage';
import VideoUploadPage from './views/VideoUploadPage/VideoUploadPage';
import VideoListPage  from './views/VideoListPage/VideoListPage';
import VideoDetailPage from './views/VideoDetailPage/VideoDetailPage';
/** Auth param 설명 */
//null   누구나 출입가능한 페이지
//true   로그인 한 유저만 출입가능한 페이지
//false  로그인한 유저는 출입불가능한 페이지

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, true)} />
          <Route exact path="/favoritePage" component={Auth(FavoritePage, true)} />
          <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
          <Route exact path="/video-list" component={Auth(VideoListPage, true)} />
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
