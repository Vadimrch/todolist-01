type Props = {
    title: string
    onClickHandler?: () => void
    disabled?: boolean
}

export const Button = ({title, onClickHandler, disabled}: Props) => {
    return (
<button
    disabled={disabled}
    onClick={onClickHandler}>{title}</button>
    )
}