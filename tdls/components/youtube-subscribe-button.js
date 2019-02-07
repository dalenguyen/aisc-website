import { useRef, useEffect } from 'react';

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
    <div className="g-ytsubscribe" ref={subEl}
      style={{ display: "inline" }}></div>
  );
}