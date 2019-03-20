import { useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';

export default () => {
  const subEl = useRef(null);
  useEffect(() => {
    const options = {
      channel: 'UCfk3pS8cCPxOgoleriIufyg',
      layout: 'full'
    };
    gapi.ytsubscribe.render(subEl.current, options);
  }, []);
  return (
    // <div className="g-ytsubscribe" ref={subEl}
    //   style={{ display: "inline" }}></div>
    <div>
      <a
        className="btn btn-danger"
        href="https://www.youtube.com/channel/UCfk3pS8cCPxOgoleriIufyg?view_as=subscriber&sub_confirmation=1">
        <i className="fa fa-youtube" style={{ fontSize: "1.5em" }}></i>&nbsp;Subscribe to AISC YouTube Channel
      </a>
    </div>
  );
}