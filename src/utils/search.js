export default function (items, term) {
  if (!items) {
    return [];
  }

  if (term.length === 0) {
    return items;
  }

  return items.filter((item) => {
    return item.toLowerCase().indexOf(term.toLowerCase()) > -1;
  });
}
