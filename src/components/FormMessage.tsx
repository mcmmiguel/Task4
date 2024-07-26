import { ReactNode } from "react"

const FormMessage = ({ children, type }: { children: ReactNode, type: "error" | "success" }) => {
    return (
        <div className={`alert alert-${type === 'success' ? "success" : "danger"}`} role="alert">
            {children}
        </div>
    )
}
export default FormMessage;