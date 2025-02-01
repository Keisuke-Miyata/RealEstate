import React from "react"
import { Avatar, Menu } from "@mantine/core"
import { useNavigate } from 'react-router-dom'


const ProfileMenu = ({ user, logout }) => {

    const navigate = useNavigate()

    return (

        <Menu>
            <Menu.Target>
                <Avatar src={user?.picture} alt="userImage" radius={"xl"} />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item onClick={() => navigate("./profile", { replace: true })}>
                    Profile
                </Menu.Item>
                <Menu.Item onClick={() => {
                    localStorage.clear()
                    logout()
                }} color="red">
                    logout
                </Menu.Item>

            </Menu.Dropdown>
        </Menu>
    )
}

export default ProfileMenu