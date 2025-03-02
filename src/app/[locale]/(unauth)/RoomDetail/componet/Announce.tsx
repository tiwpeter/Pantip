// layout Announce

import DetailAnuo from './DetailAnuo';

// use redux    // <PantipPick/>
export default function AnnouncePage() {
  return (
    <section className="flex">
      {/* <!--startmore--> */}
      <div>
        <div
          className="mt-5"
          style={{
            backgroundColor: '#7f99ff',
            display: 'flex',
            minHeight: '43px',
            padding: '12px 16px',
            position: 'relative',
            whiteSpace: 'normal',
          }}
        >
          <h3>Announce</h3>
        </div>
        <DetailAnuo />
      </div>
    </section>
  );
}
