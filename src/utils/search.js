export function titleSearch(items, term) {
  if (!items) {
    return null;
  }

  if (term.length === 0) {
    return items;
  }

  return items.filter((item) => {
    return item.title.toLowerCase().indexOf(term.toLowerCase()) > -1;
  });
}

export function authorSearch(items, term) {
  if (!items) {
    return null;
  }

  if (term.length === 0) {
    return items;
  }

  return items.filter((item) => {
    return item.author.toLowerCase().indexOf(term.toLowerCase()) > -1;
  });
}
