import { apiInitializer } from "discourse/lib/api";
import { computed } from "@ember/object";
import { makeArray } from "discourse-common/lib/helpers";

const PLUGIN_ID = "hide-tags-from-the-filter-drop-down";
export default apiInitializer("0.11.1", (api) => {
  const hiddenTags = settings.hide_tags.split("|");

  if (!hiddenTags.length) {
    return;
  }

  api.modifyClass("component:tag-drop", {
    pluginId: PLUGIN_ID,

    content: computed("topTags.[]", "shortcuts.[]", function () {
      const topTags = this.topTags
        .slice(0, this.maxTagsInFilterList)
        .filter((tag) => !hiddenTags.includes(tag));

      if (this.sortTagsAlphabetically && topTags) {
        return this.shortcuts.concat(topTags.sort());
      } else {
        return this.shortcuts.concat(makeArray(topTags));
      }
    }),
  });
});
