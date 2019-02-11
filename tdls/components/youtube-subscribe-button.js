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
        href="https://www.youtube.com/c/TorontoDeepLearningSeries?view_as=subscriber&sub_confirmation=1">
        Subscribe to TDLS YouTube Channel
      </a>
    </div>
  );
}