
// Gets a new ID based on the collection passed.
function getNewId(items) {
  return !!items.length
    ? (items.map(x => x.id)
      .reduce(function (a, next) {
        return Math.max(a, next);
      }) + 1)
    : 1;
}
// Wraps the default functionality for adding a new object to a collection. 
// Incrementing the ID if needed.
function pushItem(item, getData, setData) {
  let items = getData();
  if (!!item.id) {
    let existing = items.find(x => x.id === item.id);
    existing = Object.assign(existing, item);
  } else {
    item.id = getNewId(items);
    items.push(item);
  }
  setData(items);
}
// Removes the item from the collection based on the id.
function removeItem(id, getData, setData) {
  let items = getData;
  let index = items.findIndex((item) => item.id === id);
  if (index >= 0) {
    items.splice(index, 1);
    setData(items);
  }
}
// Gets an collection from the cach.
function getCollection(key) {
  let cache = JSON.parse(localStorage.getItem(key)) || [];
  return cache;
}
function setItem(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

// Gets the Entries
function getEntries(id) {
  return getCollection('entries');
}

function setEntries(items) {
  setItem('entries', items);
}

function getProducts() {
  return getCollection('products');
}

function setProducts(products) {
  setItem('products', products);
}

class DataSource {
  // #region Entries.
  static getEntries() {
    return getEntries();
  }
  static getEntry(id) {
    return DataSource.getEntries().find(x => x.id === parseInt(id));
  }
  static pushEntry(entry) {
    pushItem(entry, () => DataSource.getEntries(), (items) => setEntries(items));
  }
  static deleteEntry(id) {
    removeItem(id, () => DataSource.getEntries(), (items) => setEntries(items));
  }
  // #endregion 

  // #region Products
  static getProducts() {
    return getProducts();
  }
  static getProduct(id) {
    return DataSource.getProducts().find(x => x.id === parseInt(id));
  }
  static pushProduct(product) {
    pushItem(product, () => DataSource.getProducts(), (products) => setProducts(products));
  }
  static deleteProduct(id) {
    removeItem(id, () => DataSource.getProducts(), (products) => setProducts(products));
  }
  // #endregion

  // #region  Units 
  static getUnits() {
    return [
      'Grams',
      'Ounces',
      'Pounds',
      'Millilitres',
      'Litres',
      'Gallons'
    ];
  }
  // #endregion 
}

export default DataSource;
