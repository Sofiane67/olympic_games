import {StatContent} from "../interfaces/stat-content";

export const buildSubtitle = (stats: StatContent[]) => {
  let html = "";
  stats.forEach((stat: StatContent) => {
    html += `<div class="stat"> <span class="stat__title">${stat.title}</span> <span class="stat__value">${stat.value}</span></div>`
  })
  return html;
}
