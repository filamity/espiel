import Checkbox from '@material-ui/core/Checkbox'

function List({ disabled, dataName, passData }) {

    // const handleChange = (e) => {
    //     const { name, checked } = e.target
    //     setData((prev) => ({
    //         ...prev,
    //         [name]: checked
    //     }))
    // }

    const handleChange = (e) => {
        passData([e.target.name, e.target.checked])
    }

    return (
        <>
            <Checkbox
                disabled={disabled}
                value={dataName}
                onChange={handleChange}
                name={dataName}
                color="primary"
            />
        </>
    )
}

export default List