import axios from 'axios';
import { writeFileSync } from 'fs';

const requestUrl = 'https://unknow.news/archiwum.json';
const outputFile = 'mrugalski';

interface MrugalskiResponseItem {
  title: string;
  url: string;
  info: string;
  date: string;
}

async function getArchive(): Promise<MrugalskiResponseItem[]> {
  return axios
    .get<MrugalskiResponseItem[]>(requestUrl)
    .then((response) => response.data);
}

function itemToMd(index: number, item: MrugalskiResponseItem): string {
  return `### ${index + 1}. ${item.title}\n
[${item.url}](${item.url})

${item.info}

`;
}

function groupToMd(date: string, items: MrugalskiResponseItem[]): string {
  return `## ${date}\n
${items.map((item, index) => itemToMd(index, item)).join('')}`;
}

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

async function main() {
  getArchive()
    .then((response) => {
      writeFileSync(`${outputFile}.json`, JSON.stringify(response));
      return response;
    })
    .then((response) => groupBy(response, (item) => item.date))
    .then((groupedResponse) =>
      Object.keys(groupedResponse).map((key) =>
        groupToMd(key, groupedResponse[key])
      )
    )
    .then((responseMd) =>
      [
        `# Archiwum Mrugalskiego na dzień ${new Date().toLocaleDateString()}\n\n`,
        ...responseMd,
      ].join('')
    )
    .then((totalMd) => {
      writeFileSync(`${outputFile}.md`, totalMd);
    });
}

main();
