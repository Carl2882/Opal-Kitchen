import MenuItem from "./MenuItem.tsx";
import {menu} from '../assets/menu.json';

export default function Store(){
    return <>
        {
            menu.map(m => <MenuItem key={m.item} menu={m} />)
        }
        </>
}