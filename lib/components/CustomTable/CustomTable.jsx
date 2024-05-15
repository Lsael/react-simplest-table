import { useState } from "react";
import styles from "./CustomTable.module.css";

/**
 * Display an entry line, called in Entries component.
 * @param {{label1: string, label2: string, ...}} datas - an object with keys corresponding to labels.
 * @param {[{id: string, name: string}]} labels - an array of object, containing id and name of the labels.
 * @param {string} backgroundColor - the color of background.
 * @param {string} fontColor - the color of the font.
 */
const EntryLine = ({ datas, labels, backgroundColor, fontColor }) => {
  return (
    <tr className={styles.entryLine}>
      {labels.map((e, index) => {
        return <td key={"entryLine" + index} style={{
          background: backgroundColor,
          color: fontColor
        }}>{datas[e.id]}</td>;
      })}
    </tr>
  );
};

/**
 * Display all entries.
 * @param {[{label1: string, label2: string, ...}]} datas - an array of objects with keys corresponding to labels.
 * @param {[{id: string, name: string}]} labels - an array of object, containing id and name of the labels.
 * @param {number} entriesPerPage - selected number of entries per page.
 * @param {number} startIndex - index of the first entry.
 * @param {{headerBackground: string, headerFont: string, oddLines: string, oddFont: string, evenLines: string, evenFont: string,}} options - an object of options.
 */
const Entries = ({ datas, labels, entriesPerPage, startIndex, options }) => {
  const colors = {
    evenBackground: options.evenLines ? options.evenLines : "inherit",
    oddBackground: options.oddLines ? options.oddLines : "inherit",
    evenFont: options.evenFont ? options.evenFont : "inherit",
    oddFont: options.oddFont ? options.oddFont : "inherit"
  }

  let entries = [];
  for (let i = 0; i < entriesPerPage; i++) {
    const backgroundColor = (i % 2 === 1) ? colors.evenBackground : colors.oddBackground
    const fontColor = (i % 2 === 1) ? colors.evenFont : colors.oddFont

    if (datas[i + startIndex]) {
      entries.push(
        <EntryLine
          datas={datas[i + startIndex]}
          labels={labels}
          key={"entry" + (i + startIndex)}
          backgroundColor={backgroundColor}
          fontColor={fontColor}
        />
      );
    } else break;
  }
  return entries;
};

/**
 * Display the table.
 * @param {string} id - CSS id of the table.
 * @param {string} title - title of the table.
 * @param {[{id: string, name: string}]} labels - an array of object, containing id and name of the labels.
 * @param {[{label1: string, label2: string, ...}]} datas - an array of objects with keys corresponding to labels.
 * @param {{headerBackground: string, headerFont: string, oddLines: string, oddFont: string, evenLines: string, evenFont: string,}} options - an object of options.
 */
const CustomTable = ({ id, title, labels, datas, options }) => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [tableDatas, setTableDatas] = useState(datas);
  const tableOptions = options ? options : {
    headerBackground: undefined,
    headerFont: undefined,
    LineFont: undefined,
    evenLines: undefined,
    oddLines: undefined,
  }

  const handleSearch = (e) => {
    const filteredEntries = datas.filter((element) => {
      for (let key in element) {
        if (element[key].toUpperCase().match(e.target.value.toUpperCase())) {
          return true;
        }
      }
    });
    setTableDatas(filteredEntries);
  };

  const handleSort = (e) => {
    const name = e.target.getAttribute("name");
    const sortedEntries = [...tableDatas].sort((a, b) => {
      if (a[name] < b[name]) return -1;
      if (a[name] > b[name]) return 1;
      return 0;
    });
    setTableDatas(sortedEntries);
  };

  return (
    <div className={styles.customTable}>
      <h2>{title}</h2>
      <div className={styles.tableHeader}>
        <div className={styles.showEntries}>
          <span>Show</span>
          <select
            onChange={(e) => {
              setEntriesPerPage(parseInt(e.target.value));
              setStartIndex(0);
            }}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span>Entries</span>
        </div>
        <div className={styles.search}>
          <input
            id="table-search"
            type={"text"}
            onChange={handleSearch}
            placeholder="Search ..."
          ></input>
        </div>
      </div>
      <table id={id}>
        <thead>
          <tr
            style={{
              color: tableOptions.headerFont
                ? tableOptions.headerFont
                : "inherit",
              backgroundColor: tableOptions.headerBackground
                ? tableOptions.headerBackground
                : "inherit",
            }}
          >
            {labels.map((e, index) => {
              return (
                <th
                  scope="col"
                  key={e.label + index}
                  name={e.id}
                  className={styles.labels}
                  onClick={handleSort}
                >
                  {e.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tableDatas.length > 0 ? (
            <Entries
              datas={tableDatas}
              labels={labels}
              entriesPerPage={entriesPerPage}
              startIndex={startIndex}
              options={options}
            />
          ) : (
            <tr>
              <td colSpan={9} className={styles.emptyEntry}>
                No data available in table
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={styles.tableFooter}>
        <span>
          Showing {startIndex + 1} to{" "}
          {startIndex + entriesPerPage < tableDatas.length
            ? startIndex + entriesPerPage
            : tableDatas.length}{" "}
          of {tableDatas.length} entries
        </span>
        <div className={styles.paging}>
          <span
            onClick={() => {
              if (startIndex - entriesPerPage >= 0) {
                setStartIndex(startIndex - entriesPerPage);
              }
            }}
          >
            Previous
          </span>
          <span
            onClick={() => {
              if (startIndex + entriesPerPage < tableDatas.length) {
                setStartIndex(startIndex + entriesPerPage);
              }
            }}
          >
            Next
          </span>
        </div>
      </div>
    </div>
  );
};

export { CustomTable };
