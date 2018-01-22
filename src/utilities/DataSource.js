

function getNewId(entries) {
  return !!entries.length
    ? (entries.map(x => x.id)
      .reduce(function (a, next) {
        return Math.max(a, next);
      }) + 1)
    : 1;
}

function getEntries() {
  if (localStorage) {
    let cache = JSON.parse(localStorage.getItem('entries')) || [];
    return cache;
  }
  return [];
}

function setEntries(entries) {
  localStorage.setItem('entries', JSON.stringify(entries));
}

class DataSource {
  // #region Entries.
  static getEntries() {
    return getEntries();
  }
  static getEntry(id) {
    // eslint-disable-next-line
    return DataSource.getEntries().find(x => x.id === parseInt(id));
  }
  static pushEntry(entry) {
    let entries = DataSource.getEntries();
    if (!!entry.id) {
      // eslint-disable-next-line
      let existingEntry = entries.find(x => x.id === entry.id);
      existingEntry = Object.assign(existingEntry, entry);
    } else {
      entry.id = getNewId(entries);
      entries.push(entry);
    }
    setEntries(entries);
  }
  static deleteEntry(id) {
    let entries = DataSource.getEntries();
    let index = entries.findIndex((item) => item.id === id);
    if (index >= 0) {
      entries.splice(index, 1);
      setEntries(entries);
    }
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
