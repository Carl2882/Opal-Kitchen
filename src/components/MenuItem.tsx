import {Menu, MenuOption, MenuOptionSize} from "../types/types.ts";
import {useContext, useState} from "react";
import {CartContext} from "../contexts/CartContext.ts";


const sizeMapping: Record<MenuOptionSize, string> = {
    regular: 'R',
    small: 'S',
    large: 'L',
    'too large': 'XL'
}

const handleKeyDown = (event, option) => {
    if (event.key === 'Enter') {
      setSelectedOption(option);
    }
  };

type MenuItemProps = {
    menu: Menu
}
export default function MenuItem(props: MenuItemProps) {
    const {menu} = props;
    const [selectedOption, setSelectedOption] = useState<MenuOption>();
    const [quantity, setQuantity] = useState<number>(1);

    const {addToCart} = useContext(CartContext);

    const _addToCart = () => {
        if(!selectedOption) return;
        addToCart(menu.item, selectedOption, quantity);
        setQuantity(1);
        setSelectedOption(undefined)
    }

    return <div className="container">
        <div className="product" >{menu.item}</div>
        <div  aria-hidden="true" className="price">$ {selectedOption?.price.toFixed(2)}</div>
        <div className="sizes"><h5>Size:</h5>
        <div className="sizeArea"><ul className="sizeArea">
  {menu.options.map(option => (
    <li
      key={option.size}
      className="sizeButton"
      style={{ borderColor: selectedOption?.size === option.size ? 'green' : '' }}
      onKeyDown={e => handleKeyDown(e, option)}
      onClick={() => setSelectedOption(option)}
      title={option.size}
      aria-label={`Select size ${option.size}`}
    >
      {sizeMapping[option.size]}
    </li>
  ))}
</ul></div>
        </div>
        <div className="bottom">
            <button className="addBtn" onClick={_addToCart} disabled={!selectedOption}>Add to cart</button>
            <label htmlFor="quantity">Quantity
            <input id="quantity" className="input" value={quantity}
                   onChange={e => setQuantity(e.target.valueAsNumber)}
                   min={1}
                   step={1}
                   type='number'
                   name='quantity'
            />
            </label>
        </div>
    </div>
}