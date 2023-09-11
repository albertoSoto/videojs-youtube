/**
 * Video playback not working on codesandbox.io, CORS security issue?
 * But will work in your development
 */

import { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

const initialOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false
    }
  }
};

const videoJsOptions = {
  sources: [
    {
      type: "video/youtube",
      src: "https://www.youtube.com/watch?v=F5GO6JwzfkY"
    }
  ]
};

export default function App() {
  const videoNode = useRef(null);
  const player = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (videoNode.current && !initialized.current) {
      initialized.current = true; //prevent duplicate initialization
      player.current = videojs(videoNode.current, {
        ...initialOptions,
        ...videoJsOptions
      }).ready(function () {
        console.log("Player Ready");
      });
    }
    //clear up player on dismount
    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, []);

  return (
    <div className="App">
      <video ref={videoNode} className="video-js" />
    </div>
  );
}
