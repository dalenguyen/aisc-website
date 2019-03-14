import { getQueryStringValue } from '../../../../common/utils';
import { useEffect, useState } from 'react';


export default () => {
  const [{ eventId }, setEventIdState] = useState<{
    eventId: string | null
  }>({ eventId: null });
  useEffect(() => {
    const eventId = getQueryStringValue("event");
    setEventIdState({ eventId });
  }, []);
  return !eventId ? null : (
    <main>
      {eventId}
    </main>
  );
}