import "./list-box.css";

export const ListBox = ({
  items,
  activeIndex,
}: {
  items: any[];
  activeIndex: number;
}) => {
  return (
    <ul className="listbox-container">
      {items.map((item: any, index: number) => {
        return (
          <li
            className={`listbox-item ${
              activeIndex === index ? "active-item" : ""
            }`}
            key={index}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
};
