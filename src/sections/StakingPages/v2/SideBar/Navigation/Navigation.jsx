import NavigationStyleWrapper from "./Navigation.style";
import menus from "src/assets/data/menu/dataV3"
import menuShape from "src/assets/images/project/menu-image.png"

const Navigation = () => {

    return (
        <NavigationStyleWrapper>
            <div className="navigation_links">
                {menus?.map((menu, i) => (
                    <a key={i} href={menu.url}>{menu.title} <img src={menuShape} alt="shape" /> </a>
                ))}
            </div>
        </NavigationStyleWrapper>
    )
}

export default Navigation;