export type Menu = {
 item: string;
 options: MenuOption[];
}

export type MenuOption = {
    size: MenuOptionSize;
    price: number;
}

export type MenuOptionSize = 'regular' | 'large' | 'too large' | 'small'

export type Cart = {
    items: CartItem[];
    addToCart: (name: string, option: MenuOption, quantity: number) => void,
    removeFromCart: (item: CartItem) => void,
    clearCart: () => void,
}

export type CartItem = {
    item: string,
    option: MenuOption,
    quantity: number,
}