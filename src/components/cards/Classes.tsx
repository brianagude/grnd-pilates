// inside Momence.tsx or a separate file
import Script from "next/script";

const ClassesCard = () => (
  <>
    <div id="ribbon-schedule"></div>
    <Script
      async
      type="module"
      src="https://momence.com/plugin/host-schedule/host-schedule.js"
      strategy="afterInteractive"
      data-host_id="107640"
      data-teacher_ids="[]"
      data-location_ids="[]"
      data-tag_ids="[]"
      data-default_filter="show-all"
      data-locale="en"
    />
  </>
);

export default ClassesCard;
