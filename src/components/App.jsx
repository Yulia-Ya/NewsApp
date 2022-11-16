import React, { useEffect } from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import * as actions from "../actions/actions";
import HackNews from "./HackNews";
import Item from "./Item";
import { getNewStories } from "../api/api"; 
import Header from "./Header"
import Footer from "./Footer";

const mapStateToProps = (state) => {
  return { stories: state.stories };
};

const actionCreators = {
  addLatestStories: actions.addLatestStories,
  addStory: actions.addStory,
  setBranchStatus: actions.setBranchStatus,
};

const App = ({ addLatestStories, addStory, setBranchStatus }) => {
  useEffect(() => {
    const getStories = async () => {
      const latestStoriesIDs = await getNewStories(); 
      addLatestStories({ latestStoriesIDs: latestStoriesIDs.slice(0, 100) });
      const data = JSON.parse(sessionStorage.getItem("branchesStatus"));
      const commentBranch = data ?? {};
      setBranchStatus({ commentBranch });
    };
    getStories().then(() => {});
  }, [addLatestStories, addStory, setBranchStatus]);



  return (
    <Router basename="/">
      <Header />
      <Route path="/" exact component={HackNews} />
      <Route path="/:id" component={Item} />
      <Footer />
    </Router>
  );
};

export default connect(mapStateToProps, actionCreators)(App);
