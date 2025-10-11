
const momenceEmbedHtml = `
  <div id="ribbon-schedule"></div>
  <script
    async
    type="module"
    host_id="107640"
    teacher_ids="[]"
    location_ids="[]"
    tag_ids="[]"
    default_filter="show-all"
    locale="en"
    src="https://momence.com/plugin/host-schedule/host-schedule.js"
  ></script>
`;

export default function MomenceWidget() {
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: The only way this integration works
<div dangerouslySetInnerHTML={{ __html: momenceEmbedHtml }} />
  );
}
