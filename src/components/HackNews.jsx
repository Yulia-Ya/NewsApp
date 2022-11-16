import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { placeholderIDs } from "../utils/placeholderIDs";
import * as actions from "../actions/actions";
import { getNewStories } from "../api/api";
import ItemPage from "./ItemPage";
import LazyLoad from "react-lazyload";
import ItemPlaceholder from "./ItemPlaceholder";

const mapStateToProps = (state) => {
  return { stories: state.stories, ui: state.ui };
};

const actionCreators = {
  addLatestStories: actions.addLatestStories,
};

const HackNews = ({ stories, addLatestStories }) => {
  const [seconds, setSeconds] = useState(59);

  // >> TIMER
  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      handleUpdateStoriesIDs().then(() => setSeconds(59));
    }

    return () => {
      clearTimeout(timer);
    };
  }, [setSeconds, seconds]);



  const handleUpdateStoriesIDs = async () => {
    const latestStoriesIDs = await getNewStories();
    addLatestStories({ latestStoriesIDs: latestStoriesIDs.slice(0, 100) });
    setSeconds(59);
  };

  const renderPlaceholders = () =>
    placeholderIDs.map((id) => (
      <div key={id} className="lazyload-wrapper">
        <ItemPlaceholder />
      </div>
    ));

  const renderStories = () =>
    stories.latestStoriesIDs.map((storyID) => (
      <LazyLoad
        key={storyID}
        placeholder={<ItemPlaceholder />}
        offset={300}
      >
        <ItemPage key={storyID} id={storyID} />
      </LazyLoad>
    ));

  return (
    <main>
      <h2>LATEST NEWS</h2>
      <div className="refresh-btn-wrapper">
        <button
          className="button button-animated"
          onClick={handleUpdateStoriesIDs}
        >
          <span>
            <span>Refresh in {seconds}</span>
          </span>
        </button>
      </div>
      <section className="stories-list">
        {stories.latestStoriesIDs.length === 0
          ? renderPlaceholders()
          : renderStories()}
      </section>
    </main>
  );
};

export default connect(mapStateToProps, actionCreators)(HackNews);
