import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getItem } from "../api/api";
import ItemPlaceholder from "./ItemPlaceholder";

export default function ItemPage({ id }) {
  const [story, setStory] = useState({});
  const [requestStatus, setRequestStatus] = useState("fetching");

  useEffect(() => {
    setRequestStatus("fetching");
    const storyRequest = async () => {
      const response = await getItem(id);
      setStory(response);
    };
    storyRequest().then(() => setRequestStatus("finished"));
  }, [id]);

  return !story || requestStatus === "fetching" ? (
    <ItemPlaceholder />
  ) : (
    <article className="story-preview">
      <Link className="link" to={`/${story.id}`}>
        {story.title}
      </Link>
      <section className="story-info">
        <div>
          <span>By:</span> {story.by}
        </div>
        <div>
          <span>Posted:</span>{new Date(story.time * 1000).toLocaleDateString('ru-RU')}
        </div>
        <div>
          <span>Comments:</span> {story.descendants}
        </div>
      </section>
    </article>
  );
};


