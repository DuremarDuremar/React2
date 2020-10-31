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

export function autorSearch(items, term) {
  if (!items) {
    return null;
  }

  if (term.length === 0) {
    return items;
  }

  return items.filter((item) => {
    return item.autor.toLowerCase().indexOf(term.toLowerCase()) > -1;
  });
}
