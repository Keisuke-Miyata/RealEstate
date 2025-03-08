import { useAuth0 } from "@auth0/auth0-react"
import { toast } from "react-toastify"

const useAuthCheck = (): { validateLogin: () => boolean } => {
    const { isAuthenticated } = useAuth0()
    const validateLogin = (): boolean => {
        if (!isAuthenticated) {
            toast.error("You must be logged in", { position: "bottom-right" })
            return false
        } else
            return true
    }

    return (
        { validateLogin }
    )
}

export default useAuthCheck