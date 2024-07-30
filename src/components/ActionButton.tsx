
type ActionButtonProps = {
    label: string;
    variant: | 'block' | 'unlock' | 'delete' | 'logout';
    svg: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ActionButton = ({ label, variant, svg, onClick }: ActionButtonProps) => {

    const buttonClass = `d-flex align-items-center btn ${variant === 'block' ? 'btn-outline-warning' :
        variant === 'unlock' ? 'btn-outline-success' :
            variant === 'delete' ? 'btn-danger' :
                variant === 'logout' ? 'btn-outline-primary' : 'btn-primary'} `;

    return (
        <button className={buttonClass} onClick={onClick} style={{ gap: 5 }}>
            {svg}
            {label}
        </button>
    )
}
export default ActionButton