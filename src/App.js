import { useState, useEffect } from "react";

// Initial items for packing list
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Shoes", quantity: 1, packed: true },
];

// Main App component
export default function App() {
  const [newArr, setNewArr] = useState([]);
  const [packedStatus, setPackedStatus] = useState(false);
  function onDeleteItem(idToDelete) {
    setNewArr(function (newarr) {
      return newarr.filter(function (item) {
        return item.id !== idToDelete;
      });
    });
  }
  const handleAddItem = function (item) {
    setNewArr(function (newArr) {
      return [...newArr, item];
    });
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} packedStatus={packedStatus} />
      <PackingList
        itemsEntered={newArr}
        ondeleteitems={onDeleteItem}
        packedStatus={packedStatus}
        setPackedStatus={setPackedStatus}
      />
      <Stats totalItems={newArr} />
    </div>
  );
}

// Logo component
function Logo() {
  return <h1>Pack Track 🧳</h1>;
}

// Form component for adding items to the packing list
function Form({ onAddItems, packedStatus }) {
  const [description, setDescription] = useState("");
  const [quantityOfItem, setQuantityOfItem] = useState("1");

  function handleClick(e) {
    e.preventDefault();
    const newObj = {
      description,
      quantityOfItem,
      id: Date.now(),
      packed: packedStatus,
    };
    onAddItems(newObj);
    setDescription("");
    setQuantityOfItem("1");
    /* setPackedStatus(true); */
  }

  const handleChange = function (e) {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleChangeDescription = function (e) {
    setQuantityOfItem(e.target.value);
  };
  return (
    <form className="add-form" style={{ border: "2px solid red" }}>
      <h3>What do you need for your trip?</h3>
      <select value={quantityOfItem} onChange={handleChangeDescription}>
        {/* <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option> */}
        {Array.from({ length: 20 }, (el, i) => i + 1).map(function (
          numberOfItems
        ) {
          return (
            <option key={numberOfItems} value={numberOfItems}>
              {numberOfItems}
            </option>
          );
        })}
      </select>

      <input
        type="text"
        placeholder="Item.."
        onChange={handleChange}
        value={description}
      />
      <button onClick={handleClick} value={description}>
        Add
      </button>
    </form>
  );
}

// Packing list component to display added items
function PackingList({
  itemsEntered,
  ondeleteitems,
  packedStatus,
  setPackedStatus,
}) {
  return (
    <div className="list">
      <ul>
        {itemsEntered.map(function (item) {
          // console.log(item);
          return (
            <Item
              descriptions={item.description}
              quantitys={item.quantityOfItem}
              key={item.id}
              id={item.id}
              ondeleteitems={ondeleteitems}
              packedStatus={packedStatus}
              setPackedStatus={setPackedStatus}
            />
          );
        })}
      </ul>
    </div>
  );
}
const Item = function ({
  id,
  descriptions,
  quantitys,
  ondeleteitems,
  packedStatus,
  setPackedStatus,
}) {
  const [lineThrough, setLineThrough] = useState(false);
  // console.log("id ==>", id);
  const handleClick = function () {
    setLineThrough(!lineThrough);
    setPackedStatus(!packedStatus);
    console.log(packedStatus);
  };
  const handleDeleteItem = function () {
    ondeleteitems(id);
  };
  return (
    <li>
      <input type="checkbox" onClick={handleClick}></input>
      <span className={packedStatus ? "line-through" : ""}>
        {quantitys}
        {descriptions}
      </span>
      <button onClick={handleDeleteItem}>❌</button>
    </li>
  );
};

// Stats component to show packing statistics
function Stats({ totalItems }) {
  const totalNumberOfItems = totalItems.length;
  const numberOfPackedItem = totalItems.filter((currentitem) => {
    console.log(currentitem);
    return currentitem.packed;
  }).length;
  const percentagePacked = totalItems
    ? Math.round((numberOfPackedItem / totalItems) * 100)
    : 0;
  return (
    <footer className="stats">
      <em>
        You have {totalNumberOfItems} items on your list, and you already packed
        {numberOfPackedItem} {`${percentagePacked}%`}
      </em>
    </footer>
  );
}
// NOTES
//- Derived state refers to a situation where the state of a component is calculated or derived from other existing state or props.
