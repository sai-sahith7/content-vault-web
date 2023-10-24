import "./ItemMenu.css";

export default function ItemMenu(props) {
  return (
    <div className="item-menu-container flex-container-column">
      <div
        onClick={props.deleteItem}
        className="item-menu-item flex-container-row"
      >
        <img
          src="/images/delete.png"
          alt="Delete Item"
          className="item-menu-image"
        />
        <section className="item-menu-text">Confirm Deletion</section>
      </div>
    </div>
  );
}
