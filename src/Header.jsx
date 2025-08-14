import aiChef from "./assets/chef-claude-icon.png"

export default function Header(){
    return(
        <header className="header">
            <img src={aiChef} alt="AI Chef Icon" />
            <span>Chef Claude</span>
        </header>
    )
}